export interface State {
  id: number
  name: string
  uf: string
}

export interface City {
  id: number
  name: string
  state_id: number
}
