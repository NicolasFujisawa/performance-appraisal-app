import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import SideBar from '../commons/components/SideBar'
import { CriteriasResponse } from '../interfaces/criterias.response'
import { Evaluation as IEvaluation } from '../interfaces/evaluation'
import { SendEvaluationScoresPayload } from '../interfaces/send.evaluation.scores.payload'
import { TeamMember } from '../interfaces/team'
import { getEvaluation, sendEvaluationScores } from '../services/api'
import { useAppSelector } from '../store/hooks'
import { selectUser } from '../store/selectors'
import '../styles/pages/evaluation-page.css'
import '../styles/pages/main-page.css'

interface FormValues {
  studentId: number
  criterias: {
    [key: string]: number
  }
}

interface EvaluationParams {
  id: string
}

export default function Evaluation() {
  const { userId, role } = useAppSelector(selectUser)

  const [evaluation, setEvaluation] = useState<IEvaluation>({} as any)

  const params = useParams<EvaluationParams>()

  const [criterias, setCriterias] = useState<CriteriasResponse>()
  const [formValues, setFormValues] = useState<FormValues>({
    criterias: {},
  } as FormValues)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [index, setIndex] = useState(0)
  const currentStudent = teamMembers[index]?.student

  const loadEvaluation = async () => {
    const {
      data: { data },
    } = await getEvaluation(parseInt(params.id))
    setEvaluation(data)
    setCriterias(data.method?.criterias)
    setTeamMembers(data.team?.members)
  }

  useEffect(() => {
    loadEvaluation()
  }, [params])

  function buildRequestPayload(): SendEvaluationScoresPayload {
    const evaluator =
      role === 'teacher'
        ? { evaluatorTeacher: userId }
        : { evaluatorStudent: userId }

    return Object.entries(formValues.criterias).map(([key, value]) => ({
      evaluatedStudent: formValues.studentId,
      criteriaScore: value,
      evaluation: evaluation.evaluationId,
      criteria: parseInt(key),
      ...evaluator,
    }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const payload = buildRequestPayload()
    await sendEvaluationScores(payload)
    handleIndex()
    setFormValues({ studentId: 0, criterias: {} })
  }

  function handleCriteriaScoreChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newFormValues = { ...formValues }
    const [, criteriaId] = name.split('-')
    newFormValues.criterias[criteriaId] = parseInt(value)
    newFormValues.studentId = currentStudent.studentId
    setFormValues(newFormValues)
  }

  function handleIndex() {
    const max = teamMembers.length - 1
    if (max > index) setIndex(index + 1)
    if (max <= index)
      alert(`Avaliação da equipe ${evaluation.team?.name} completa!`)
  }

  if (!evaluation) {
    return <p>Carregando..</p>
  }

  return (
    <div id="page-component">
      <SideBar />

      <main>
        <div id="page-container">
          <div className="page-team-info">
            <legend>Avaliar</legend>
            <h2>
              {evaluation.team?.name} - {evaluation.name}
            </h2>
          </div>
          <hr />
          <form
            className="evaluation-form"
            onSubmit={handleSubmit}
            key={`student-evaluation-${currentStudent?.studentId}`}
          >
            <div className="student-name">
              <h3>{currentStudent?.name}</h3>
            </div>
            {criterias?.map((criteria) => (
              <div
                className="criteria-field"
                key={`criteria-${criteria.criteriaId}`}
              >
                <h3>{criteria.name}</h3>
                <div className="criteria-scores">
                  {criteria.criteriaScores?.map((criteriaScore) => (
                    <div
                      className="criteria-score-radio"
                      key={`criteria-score-${criteriaScore.criteriaScoreId}`}
                    >
                      <input
                        id={`${criteria.criteriaId}-${criteriaScore.criteriaScoreId}`}
                        type="radio"
                        name={`criteria-${criteria.criteriaId}-${currentStudent?.studentId}`}
                        value={criteriaScore.criteriaScoreId}
                        onChange={handleCriteriaScoreChange}
                      />
                      <label
                        htmlFor={`${criteria.criteriaId}-${criteriaScore.criteriaScoreId}`}
                      >
                        {criteriaScore.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button className="confirm-button" type="submit">
              Próximo
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
