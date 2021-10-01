import '../styles/pages/main-page.css'
import '../styles/pages/evaluation-page.css'
import { getEvaluation, sendEvaluationScores } from '../services/api'
import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { CriteriasResponse } from '../interfaces/criterias.response'
import { useParams } from 'react-router'
import { SendEvaluationScoresPayload } from '../interfaces/send.evaluation.scores.payload'
import { Evaluation as IEvaluation } from '../interfaces/evaluation'
import { TeamMember } from '../interfaces/team'
import { useQuery } from '../commons/utils/useQuery'

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
  const [evaluation, setEvaluation] = useState<IEvaluation>({} as any)

  const params = useParams<EvaluationParams>()
  const query = useQuery()

  const [criterias, setCriterias] = useState<CriteriasResponse>()
  const [formValues, setFormValues] = useState<FormValues>({
    studentId: 0,
    criterias: {},
  })
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
    return Object.entries(formValues.criterias).map(([key, value]) => ({
      evaluatedStudent: formValues.studentId,
      evaluatorStudent: parseInt(query.get('student') || '1'),
      evaluatorTeacher: parseInt(query.get('teacher') || '1'),
      criteriaScore: value,
      evaluation: evaluation.evaluationId,
      criteria: parseInt(key),
    }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const payload = buildRequestPayload()
    const result = await sendEvaluationScores(payload)
    handleIndex()
    setFormValues({ studentId: 0, criterias: {} })
    console.log(payload)
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
      <main>
        <div id="page-container">
          <div className="page-team-info">
            <legend>Avaliar</legend>
            <h2>{evaluation.team?.name}</h2>
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
