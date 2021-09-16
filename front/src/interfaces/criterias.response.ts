export type CriteriasResponse = CriteriaResponse[]

export interface CriteriaResponse {
  criteriaId: number
  name: string
  methodId: number
  citeriaScores: CriteriaScoreResponse[]
}

export interface CriteriaScoreResponse {
  citeriaScoreId: number
  name: string
  value: number
}
