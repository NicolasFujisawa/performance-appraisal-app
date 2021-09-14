import axios from 'axios'
import { CriteriasResponse } from '../interfaces/criterias.response'
import { SendEvaluationScoresPayload } from '../interfaces/send.evaluation.scores.payload'

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
})

export const sendEvaluationScores = async (
  payload: SendEvaluationScoresPayload
) => instance.post('/scores', payload)

export const getCriterias = async (
  teamId: number
): Promise<CriteriasResponse> => {
  return [
    {
      criteriaId: 1,
      name: 'Proatividade',
      methodId: 1,
      citeriaScores: [
        {
          citeriaScoreId: 1,
          name: 'Proativo',
          value: 3,
        },
        {
          citeriaScoreId: 2,
          name: 'Folgado',
          value: 0,
        },
      ],
    },
    {
      criteriaId: 2,
      name: 'Autonomia',
      methodId: 2,
      citeriaScores: [
        {
          citeriaScoreId: 3,
          name: 'Autonomo',
          value: 3,
        },
        {
          citeriaScoreId: 4,
          name: 'CLT',
          value: 0,
        },
      ],
    },
  ]
}

export default instance
