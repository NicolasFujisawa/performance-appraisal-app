import axios from 'axios'
import { CreateMethodPayload } from '../interfaces/create.method.payload'
import { GetCriteriasResponse } from '../interfaces/criterias.response'
import { CriteriaPayload } from '../interfaces/criterias.scores.payload'
import { GetEvaluationResponse } from '../interfaces/get.evaluation.response'
import { GetScoresResponse } from '../interfaces/get.scores.response'
import { SendEvaluationScoresPayload } from '../interfaces/send.evaluation.scores.payload'
import { SendCreateEvaluationPayload } from '../interfaces/send.createevaluation.payload'
import { GetMethodsResponse } from '../interfaces/get.methods.response'
import { GetTeamsResponse } from '../interfaces/get.teams.response'

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
})

export const sendEvaluationScores = async (
  payload: SendEvaluationScoresPayload
) => instance.post('/scores', payload)

export const createEvaluation = async (payload: SendCreateEvaluationPayload) =>
  instance.post('/evaluations', payload)

export const getEvaluation = async (evaluationId: number) =>
  instance.get<GetEvaluationResponse>(`/evaluations/${evaluationId}`)

export const getEvaluatedStudentScores = async (
  evaluatedStudentId: number,
  evaluationId: number
) =>
  instance.get<GetScoresResponse>(
    `/scores/evaluation/${evaluationId}/evaluatedStudent/${evaluatedStudentId}`
  )

export const sendCriteria = async (payload: CriteriaPayload) =>
  instance.post('/criterias', { ...payload })

export const getCriterias = async () =>
  instance.get<GetCriteriasResponse>('/criterias')

export const createMethod = async (payload: CreateMethodPayload) =>
  instance.post('/methods', payload)

export const getMethods = async () =>
  instance.get<GetMethodsResponse>(`/methods`)

export const getTeams = async () => instance.get<GetTeamsResponse>(`/teams`)

export default instance
