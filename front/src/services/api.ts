import axios from 'axios'

import { GetEvaluationResponse } from '../interfaces/get.evaluation.response'
import { SendEvaluationScoresPayload } from '../interfaces/send.evaluation.scores.payload'

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
})

export const sendEvaluationScores = async (
  payload: SendEvaluationScoresPayload
) => instance.post('/scores', payload)

export const getEvaluation = async (evaluationId: number) =>
  instance.get<GetEvaluationResponse>(`/evaluations/${evaluationId}`)

export const getEvaluatedStudentScores = async (evaluatedStudentId: number, evaluationId: number) =>
  instance.get<GetEvaluationResponse>(`/scores/evaluation/${evaluationId}/evaluatedStudent/${evaluatedStudentId}`)

export default instance
