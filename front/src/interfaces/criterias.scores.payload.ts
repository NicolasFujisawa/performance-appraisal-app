export interface CriteriaPayload {
  name: string
  criteriaScores: CriteriaScorePayload[]
}

export interface CriteriaScorePayload {
  name: string
  value: number
}
