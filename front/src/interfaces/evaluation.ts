import { CriteriaResponse } from './criterias.response'
import { Team } from './team'

export interface Evaluation {
  evaluationId: number
  name: string
  start: string
  end: string
  isLastEvaluation: boolean
  method: {
    methodId: number
    name: string
    criterias: CriteriaResponse[]
  }
  team: Team
}
