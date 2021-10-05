export type CriteriasResponse = CriteriaResponse[]

export type GetCriteriasResponse = {
  data: CriteriasResponse
}
export interface CriteriaResponse {
  criteriaId: number
  name: string
  criteriaScores?: CriteriaScoreResponse[]
}

export interface CriteriaScoreResponse {
  criteriaScoreId: number
  name: string
  value: number
  criteria: {
    criteriaId: number
    name: string
  }
}
