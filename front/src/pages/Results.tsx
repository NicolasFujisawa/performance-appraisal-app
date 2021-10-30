import '../styles/pages/main-page.css'
import '../styles/pages/results-page.css'
import { Evaluation as IEvaluation } from '../interfaces/evaluation'
import { ScoresResponse as IScoresResponse } from '../interfaces/scores.response'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getEvaluation, getEvaluatedStudentScores } from '../services/api'
import SideBar from '../commons/components/SideBar'
import EvaluationChart from '../commons/components/EvaluationChart'

interface ResultsParams {
  evaluation_id: string
  evaluated_id: string
}

export default function Results() {
  const [evaluation, setEvaluation] = useState<IEvaluation>()
  const [scores, setScores] = useState<IScoresResponse>()
  const [finalDate, setFinalDate] = useState<Date>()
  const [evaluatedName, setEvaluatedName] = useState('')

  const params = useParams<ResultsParams>()

  useEffect(() => {
    const loadScores = async () => {
      const {
        data: { data },
      } = await getEvaluatedStudentScores(
        parseInt(params.evaluated_id),
        parseInt(params.evaluation_id)
      )
      setScores(data)
      setEvaluatedName(data[0]?.evaluatedStudent.name)
    }
    const loadEvaluation = async () => {
      const {
        data: { data },
      } = await getEvaluation(parseInt(params.evaluation_id))
      setEvaluation(data)
      setFinalDate(new Date(data.end))
    }
    loadEvaluation()
    loadScores()
  }, [params])

  if (!evaluation)
    return (
      <div id="page-component">
        <main>
          <div id="page-container">Avaliação não encontrada</div>
        </main>
      </div>
    )

  return (
    <div id="page-component">
      <SideBar />
      <main>
        <div id="page-container">
          <h1>Avaliação</h1>
          <h3>{`${finalDate?.toLocaleDateString('pt-BR')} - Finalizada`}</h3>
          <h3>
            {evaluation.team?.name} - {evaluation.name}
          </h3>
          <br />
          <h1>Resultados</h1>
          {scores ? (
            <EvaluationChart
              evaluatedName={evaluatedName}
              scores={scores}
              evaluation={evaluation}
            />
          ) : (
            <p>Carregando...</p>
          )}
        </div>
      </main>
    </div>
  )
}
