import { expect, test } from 'claude-code/testing'

import { FARBE, SPRITES, rolle } from '../hooks/figuren'

test('Pixel-Figuren: jede Zeile 16 Pixel, nur bekannte Farben', async () => {
  const rollen = Object.keys(SPRITES)
  expect(rollen.length).toBeGreaterThanOrEqual(6)
  for (const [name, s] of Object.entries(SPRITES)) {
    for (const zeilen of [s.a, s.b]) {
      expect(zeilen.length).toBe(19)
      for (const zeile of zeilen) {
        expect(`${name}:${zeile.length}`).toBe(`${name}:16`)
        expect([...zeile].filter(c => c !== '.' && !(c in FARBE))).toEqual([])
      }
    }
  }
})

test('Rollen nach Agententyp', async () => {
  expect(rolle('Explore')).toBe('Reifenwechsler')
  expect(rolle('Plan')).toBe('Teamchef')
  expect(rolle('code-reviewer')).toBe('Lollipop-Mann')
  expect(rolle('seo-technical')).toBe('Streckenposten')
  expect(rolle('claude-code-guide')).toBe('Renningenieur')
  expect(rolle('fork')).toBe('Tankwart')
  expect(rolle('general-purpose')).toBe('Mechaniker')
})

const BAND = {
  plugin: 'boxencrew',
  component: 'AbovePrompt',
  props: {
    hasSurvey: false,
    isCollapsed: false,
    isWorking: true,
    maxRows: 20,
    bodyColumns: 80,
    scroll: { offset: 0, bodyRows: 20 },
    view: {},
  },
} as const

test('Subagent erscheint als Figur und verschwindet am Turn-Ende', async ($, on) => {
  // Die Hooks hier stehen für die Engine unter dem Plugin.
  on('agent.spawn', () => ({ model: 'haiku', agentId: 'a1' }))
  on('agent.list', () => ({ value: [] }))
  on('tool.call', () => ({ result: {} }))
  on('turn.complete', () => ({ text: '' }))
  on('clock.now', () => ({ value: 0 }))
  on('ui.render', ($, e) => {
    const { Text } = $.ui.resolve(e)
    return <Text>leer</Text>
  })

  await $.agent.spawn({
    tool_use_id: 'tu1',
    prompt: 'such',
    description: 'Dateien suchen',
    subagentType: 'Explore',
    provider: { plugin: 'engine', tier: 'core' },
    parentModel: 'opus',
    background: true,
    fork: false,
  })
  await $.tool.call({ tool: 'Read', file_path: '/x', agentId: 'a1' })

  const terminal = await $.ui.mount({ ...BAND, surface: 'terminal' })
  expect(await terminal.find({ type: 'Text', text: /1 im Einsatz/ })).toBeDefined()
  expect(await terminal.find({ type: 'Text', text: /Reifenwechsler/ })).toBeDefined()
  expect(await terminal.find({ type: 'Text', text: /Dateien suchen/ })).toBeDefined()
  await terminal.unmount()

  // Desktop: ein einziges Bild mit Teamchef und Reifenwechsler nebeneinander.
  const desktop = await $.ui.mount({ ...BAND, surface: 'desktop' })
  const streifen = await desktop.find({ type: 'Svg' })
  expect(streifen?.props.width).toBe(4096)
  // Zwei Figuren: Mitten bei 25 % und 75 % der Breite.
  expect(String(streifen?.props.source)).toContain('x="25.000%"')
  expect(String(streifen?.props.source)).toContain('x="75.000%"')
  expect(String(streifen?.props.source)).toContain('Reifenwechsler')
  expect(String(streifen?.props.source)).toContain('Dateien suchen')
  expect(String(streifen?.props.alt)).toContain('1 im Einsatz')
  await desktop.unmount()

  await $.turn.complete({ answer: 'fertig', durationMs: 1, isAborted: false, turnId: 't1', agentId: 'a1', reason: 'answer' })

  const leer = await $.ui.mount({ ...BAND, surface: 'desktop' })
  expect(await leer.find({ type: 'Svg' })).toBeUndefined()
  expect(await leer.find({ type: 'Text', text: /leer/ })).toBeDefined()
  await leer.unmount()
})
