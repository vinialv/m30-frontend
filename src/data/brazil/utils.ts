import { cities, states } from './'
import { City, State } from './types'

export function getStates(): State[] {
  return states
}

export function getCities(): City[] {
  return cities
}

export function getStateById(stateId: number): State | undefined {
  return states.find((state) => state.id === stateId)
}

export function getStateByUf(uf: string): State | undefined {
  return states.find((state) => state.uf.toLowerCase() === uf.toLowerCase())
}

export function getCitiesByStateId(stateId: number): City[] {
  return cities.filter((city) => city.state_id === stateId)
}

export function getCityById(cityId: number): City | undefined {
  return cities.find((city) => city.id === cityId)
}
