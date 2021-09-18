import '../styles/pages/main-page.css'
import { Evaluation as IEvaluation } from '../interfaces/evaluation'
import { ScoresResponse as IScoresResponse } from '../interfaces/scores.response'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getEvaluation, getEvaluatedStudentScores } from '../services/api'

export default function Results() {
  const [evaluation, setEvaluation] = useState<IEvaluation>({} as any)
  const [scores, setScores] = useState<IScoresResponse>({} as any)
  const params = useParams()

  const loadEvaluation = async () => {
    const {
      data: { data },
    } = await getEvaluation(1)
    setEvaluation(data)
  }

  const loadScores = async () => {
    const {
      data: { data },
    } = await getEvaluatedStudentScores(1, 1)
    setScores(data)
  }

  const finalDate = new Date(evaluation.end)
  useEffect(() => {
    loadEvaluation()
    loadScores()
  }, [params])
  return (
    <div id="page-container">
      <h1>Avaliação</h1>
      <h4>{`${finalDate.toLocaleDateString('pt-BR')} - Finished`}</h4>
      <h4>{evaluation.team?.name}</h4>
      <br />
      <h1>Resultados</h1>
      <h5>Aluno</h5>
      <p>Criterio 1:3</p>
      <p>Criterio 2:2</p>
      <p>Criterio 3:3</p>
    </div>
  )
}
