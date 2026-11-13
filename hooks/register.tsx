import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Figur, Rolle } from '../types'
import { band, BREITE_MAX, FARBE, HOEHE, rolle } from './figuren'

// Tag hochzählen, wenn sich die Felder von Figur ändern.
const crew = atom({ plugin: 'boxencrew', key: 'crew' } as const, [], { shape: 'crew-1' })

const TAETIGKEIT: Record<string, string> = {
  Bash: 'an der Konsole',
  Read: 'liest Daten',
  Grep: 'sucht',
  Glob: 'sucht',
  Edit: 'schraubt',
  Write: 'baut ein',
  WebFetch: 'funkt raus',
  WebSearch: 'funkt raus',
  Agent: 'holt Verstärkung',
  Skill: 'liest Handbuch',
}

export function taetigkeit(tool: string): string {
  return TAETIGKEIT[tool] ?? (tool.startsWith('mcp__') ? 'am Funkgerät' : 'arbeitet')
}

// Ein Agent ohne Turn-Ende (z. B. Fernlauf) fällt nach drei Stunden raus.
const HOECHSTENS_MS = 3 * 60 * 60 * 1000
const LAEUFT = new Set(['pending', 'running', 'waiting'])

// Liste mit dem Agenten-Verzeichnis abgleichen: Beendete fliegen raus.
// Workflow-Agenten stehen nicht im Verzeichnis und bleiben bis zu ihrem Turn-Ende.
async function abgleichen($: EngineInterface) {
  try {
    const jetzt = await $.clock.now()
    const status = new Map((await $.agent.list()).map(a => [a.id, a.status as string]))
    await update($, crew, list =>
      list.filter(f => {
        const s = status.get(f.id)
        return (s === undefined || LAEUFT.has(s)) && jetzt - f.seit < HOECHSTENS_MS
      }),
    )
  } catch {
    // Abgleich ist nur Aufräumen; ohne ihn bleibt die Liste, wie sie ist.
  }
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await abgleichen($)
    return next(e)
  })

  on('agent.spawn', async ($, e, next) => {
    const r = await next(e)
    if ('agentId' in r && r.agentId) {
      const figur: Figur = {
        id: r.agentId,
        typ: e.fork ? 'fork' : e.subagentType,
        aufgabe: e.description || e.name || e.subagentType,
        taetigkeit: 'rückt aus',
        seit: await $.clock.now(),
      }
      await update($, crew, list => [...list.filter(f => f.id !== figur.id), figur])
    }
    return r
  })

  on('tool.call', async ($, e, next) => {
    const id = e.agentId
    if (id) {
      const t = taetigkeit(e.tool)
      const list = await read($, crew)
      if (list.some(f => f.id === id && f.taetigkeit !== t)) {
        await update($, crew, l => l.map(f => (f.id === id ? { ...f, taetigkeit: t } : f)))
      }
    }
    return next(e)
  })

  on('turn.complete', async ($, e, next) => {
    const id = e.agentId
    if (id) {
      await update($, crew, list => list.filter(f => f.id !== id))
    } else {
      await abgleichen($)
    }
    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const list = await read($, crew)
    if (e.props.hasSurvey || list.length === 0) {
      return next(e)
    }

    // Der Teamchef (Hauptsitzung) steht am Kommandostand, solange die Crew draußen ist.
    const figuren = [
      { id: 'teamchef', rolle: 'Teamchef' as Rolle, aufgabe: 'Kommandostand', taetigkeit: 'dirigiert' },
      ...list.map(f => ({ id: f.id, rolle: rolle(f.typ), aufgabe: f.aufgabe, taetigkeit: f.taetigkeit })),
    ]
    const kopf = `Boxengasse · ${list.length} im Einsatz`

    if (e.surface === 'terminal') {
      const { Box, Text } = $.ui.resolve(e)
      return (
        <Box flexDirection="column">
          <Text dimColor>{kopf}</Text>
          {figuren.map(f => (
            <Text key={f.id} wrap="truncate-end">
              <Text color={FARBE.Y}>{f.rolle}</Text> {f.aufgabe} <Text dimColor>· {f.taetigkeit}</Text>
            </Text>
          ))}
        </Box>
      )
    }

    // Ein einziges Bild über die volle Breite: die App kappt BREITE_MAX auf die Bandbreite.
    const { Svg } = $.ui.resolve(e)
    return (
      <Svg
        source={band(figuren)}
        alt={`${kopf}: ${figuren.map(f => `${f.rolle} (${f.aufgabe})`).join(', ')}`}
        width={BREITE_MAX}
        height={HOEHE}
        isInteractive
      />
    )
  })
}
