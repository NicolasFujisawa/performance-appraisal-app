import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import EvaluationChart from '../commons/components/EvaluationChart'
import SideBar from '../commons/components/SideBar'
import { Evaluation as IEvaluation } from '../interfaces/evaluation'
import { ScoresResponse as IScoresResponse } from '../interfaces/scores.response'
import { getEvaluatedStudentScores, getEvaluation } from '../services/api'
import { useAppSelector } from '../store/hooks'
import { selectUser } from '../store/selectors'
import '../styles/pages/main-page.css'
import '../styles/pages/results-page.css'

interface ResultsParams {
  evaluation_id: string
  evaluated_id: string
}

export default function Results() {
  const [evaluation, setEvaluation] = useState<IEvaluation>()
  const [scores, setScores] = useState<IScoresResponse>()
  const [autoEvaluationScores, setAutoEvaluationScores] =
    useState<IScoresResponse>()
  const [finalDate, setFinalDate] = useState<Date>()
  const [evaluatedName, setEvaluatedName] = useState('')

  const params = useParams<ResultsParams>()
  const { userId } = useAppSelector(selectUser)

  let evaluatorsName = scores?.map((score) => (
    score.evaluatorStudent.name
  ))
  evaluatorsName = evaluatorsName?.filter((name, index) => (
    evaluatorsName?.indexOf(name) === index
  ))

  useEffect(() => {
    const loadScores = async () => {
      const {
        data: { data },
      } = await getEvaluatedStudentScores(
        parseInt(params.evaluated_id),
        parseInt(params.evaluation_id)
      )

      setScores(
        data.filter((score) => score.evaluatorStudent.studentId !== userId)
      )
      setAutoEvaluationScores(
        data.filter((score) => score.evaluatorStudent.studentId === userId)
      )
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
          <div className="evaluation-result-container">
            <h1>Autoavaliação</h1>
            {autoEvaluationScores ? (
              <EvaluationChart
                evaluatedName={evaluatedName}
                scores={autoEvaluationScores}
                evaluation={evaluation}
              />
            ) : (
              <p>Carregando...</p>
            )}
          </div>
          <div className="evaluation-result-container">
            <h1>Minha média</h1>
            {
              !evaluation.isAnonymous && (
                <div className="evaluators">
                <p>Avaliado por:</p>
                {
                  evaluatorsName?.map((name) => (
                    <p>{name}</p>
                  ))
                }
                </div>
              )
            }
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
        </div>
      </main>
    </div>
  )
}
