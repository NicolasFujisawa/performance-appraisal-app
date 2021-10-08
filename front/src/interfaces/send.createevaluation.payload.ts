export type SendCreateEvaluationsPayload = SendCreateEvaluationPayload[]

export interface SendCreateEvaluationPayload {
  name: string
  start: string
  end: string
  isLastEvaluation: boolean
  method: { methodId: number }
  team: { teamId: number }
}
