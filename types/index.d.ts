export type Rolle =
  | 'Teamchef'
  | 'Renningenieur'
  | 'Mechaniker'
  | 'Reifenwechsler'
  | 'Lollipop-Mann'
  | 'Streckenposten'
  | 'Tankwart'

/** Ein Subagent im Einsatz. */
export type Figur = {
  id: string
  typ: string
  aufgabe: string
  taetigkeit: string
  seit: number
}

declare module 'claude-code' {
  interface PluginState {
    boxencrew: { crew: Shaped<Figur[]> }
  }
}
