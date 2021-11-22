import axios from 'axios'
import { AuthResponseDto } from '../interfaces/auth.response.dto'
import { CreateMethodPayload } from '../interfaces/create.method.payload'
import { GetCriteriasResponse } from '../interfaces/criterias.response'
import { CriteriaPayload } from '../interfaces/criterias.scores.payload'
import {
  GetEvaluationResponse,
  GetEvaluationsResponse
} from '../interfaces/get.evaluation.response'
import { GetMethodsResponse } from '../interfaces/get.methods.response'
import { GetNotEvaluatedStudentsResponse } from '../interfaces/get.not.evaluated.students.response'
import { GetScoresResponse } from '../interfaces/get.scores.response'
import { GetTeamId } from '../interfaces/get.team.id'
import { GetTeamsResponse } from '../interfaces/get.teams.response'
import { SendCreateEvaluationPayload } from '../interfaces/send.createevaluation.payload'
import { SendEvaluationScoresPayload } from '../interfaces/send.evaluation.scores.payload'
import { StudentJoinTeam } from '../interfaces/student.join.team'

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

export const getEvaluationByTeam = async (team: number) =>
  instance.get<GetEvaluationsResponse>(`/evaluations/team/${team}`)

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

export const getTeamById = async (teamId: number) =>
  instance.get<GetTeamId>(`/teams/${teamId}`)

export const authLogin = async (payload: { identifier: string }) =>
  instance.post<AuthResponseDto>('/auth/login', payload)

export const studentJoinTeam = async (payload: StudentJoinTeam) =>
  instance.post('/teams/join', payload)

export const getNotEvaluatedStudents = async (
  evaluationId: number,
  studentId: number,
  role: string
) =>
  instance.get<GetNotEvaluatedStudentsResponse>(
    `/evaluations/${evaluationId}/not-evaluated-students/${studentId}?role=${role}`
  )

export default instance
