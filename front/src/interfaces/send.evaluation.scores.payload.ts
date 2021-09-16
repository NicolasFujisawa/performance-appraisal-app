export type SendEvaluationScoresPayload = SendEvaluationScorePayload[]

export interface SendEvaluationScorePayload {
  evaluatedStudent: number
  evaluatorStudent: number
  evaluatorTeacher: number
  criteriaScore: number
  evaluation: number
  criteria: number
}
