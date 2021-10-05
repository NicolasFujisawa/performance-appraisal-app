import axios from 'axios'
import { CriteriaPayload } from '../interfaces/criterias.scores.payload'

import { GetEvaluationResponse } from '../interfaces/get.evaluation.response'
import { GetScoresResponse } from '../interfaces/get.scores.response'
import { SendEvaluationScoresPayload } from '../interfaces/send.evaluation.scores.payload'
import { GetCriteriaResponse } from '../interfaces/get.criterias.response'
import { GetMethodsResponse } from '../interfaces/get.methods.response'

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
})

export const sendEvaluationScores = async (
  payload: SendEvaluationScoresPayload
) => instance.post('/scores', payload)

export const getEvaluation = async (evaluationId: number) =>
  instance.get<GetEvaluationResponse>(`/evaluations/${evaluationId}`)

export const getEvaluatedStudentScores = async (
  evaluatedStudentId: number,
  evaluationId: number
) =>
  instance.get<GetScoresResponse>(
    `/scores/evaluation/${evaluationId}/evaluatedStudent/${evaluatedStudentId}`
  )

export const sendCriteria = async (payload: CriteriaPayload) => instance.get('')

export default instance
