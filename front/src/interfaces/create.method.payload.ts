import { CriteriasResponse } from './criterias.response'

export interface CreateMethodPayload {
  name: string
  teacher: number
  criterias: CriteriasResponse
}
