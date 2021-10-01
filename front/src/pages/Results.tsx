import '../styles/pages/main-page.css'
import '../styles/pages/results-page.css'
import { Evaluation as IEvaluation } from '../interfaces/evaluation'
import {
  ScoresResponse as IScoresResponse,
  ScoreResponse as IScoreResponse,
} from '../interfaces/scores.response'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getEvaluation, getEvaluatedStudentScores } from '../services/api'

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

  const loadScores = async () => {
    const {
      data: { data },
    } = await getEvaluatedStudentScores(
      parseInt(params.evaluated_id),
      parseInt(params.evaluation_id)
    )
    setScores(
      data.sort((a: IScoreResponse, b: IScoreResponse) =>
        a.criteriaScore?.criteria.name > b.criteriaScore?.criteria.name
          ? 1
          : a.criteriaScore?.criteria.name === b.criteriaScore?.criteria.name
          ? a.criteriaScore?.name > b.criteriaScore?.name
            ? 1
            : -1
          : -1
      )
    )
    setEvaluatedName(data[0]?.evaluatedStudent.name)
  }

  const loadEvaluation = async () => {
    const {
      data: { data },
    } = await getEvaluation(parseInt(params.evaluation_id))
    setEvaluation(data)
    setFinalDate(new Date(data.end))
    console.log(data)
  }

  useEffect(() => {
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
      <main>
        <div id="page-container">
          <h1>Avaliação</h1>
          <h3>{`${finalDate?.toLocaleDateString('pt-BR')} - Finalizada`}</h3>
          <h3>{evaluation.team?.name}</h3>
          <br />
          <h1>Resultados</h1>
          <h2>{evaluatedName}</h2>
          {scores?.map((score) => {
            console.log(score)
            return (
              <p
                key={`criteria-result-`}
              >{`${score.criteriaScore?.criteria.name} : ${score.criteriaScore?.name}`}</p>
            )
          })}
        </div>
      </main>
    </div>
  )
}
