import '../styles/pages/main-page.css'
import { getEvaluation, sendEvaluationScores } from '../services/api'
import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { CriteriasResponse } from '../interfaces/criterias.response'
import { useParams } from 'react-router'
import { SendEvaluationScoresPayload } from '../interfaces/send.evaluation.scores.payload'
import { Evaluation as IEvaluation } from '../interfaces/evaluation'
import { Student, TeamMember } from '../interfaces/team'
interface FormValues {
  criterias: {
    [key: string]: number
  }
}

export default function Evaluation() {
  const [evaluation, setEvaluation] = useState<IEvaluation>({} as any)

  const params = useParams()

  const [criterias, setCriterias] = useState<CriteriasResponse>()
  const [formValues, setFormValues] = useState<FormValues>({ criterias: {} })
  const [students, setStudents] = useState<TeamMember[]>([])

  const loadEvaluation = async () => {
    const {
      data: { data },
    } = await getEvaluation(1)
    setEvaluation(data)
    setCriterias(data.method?.criterias)
    setStudents(data.team?.members)
  }

  useEffect(() => {
    loadEvaluation()
  }, [params])

  function buildRequestPayload(): SendEvaluationScoresPayload {
    return Object.entries(formValues.criterias).map(([key, value]) => ({
      evaluatedStudent: 1,
      evaluatorStudent: 2,
      evaluatorTeacher: 1,
      criteriaScore: value,
      evaluation: evaluation.evaluationId,
      criteria: parseInt(key),
    }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const payload = buildRequestPayload()
    const result = await sendEvaluationScores(payload)
    console.log(payload)
  }

  function handleCriteriaScoreChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newFormValues = { ...formValues }
    const [, criteriaId] = name.split('-')
    newFormValues.criterias[criteriaId] = parseInt(value)
    setFormValues(newFormValues)
  }

  return (
    <div id="page-component">
      <main>
        <div id="page-container">
          <h1>Avaliar</h1>
          <h3>{evaluation.team?.name}</h3>
          <hr />
          {students?.map((teamMember) => (
            <form
              onSubmit={handleSubmit}
              key={`student-evaluation-${teamMember?.student.studentId}`}
              style={{ marginBottom: '30px' }}
            >
              <h2>{teamMember.student.name}</h2>
              {criterias?.map((criteria) => (
                <div key={`criteria-${criteria.criteriaId}`}>
                  <h3>{criteria.name}</h3>
                  <div>
                    {criteria.criteriaScores?.map((criteriaScore) => (
                      <div
                        key={`criteria-score-${criteriaScore.criteriaScoreId}`}
                      >
                        <input
                          type="radio"
                          name={`criteria-${criteria.criteriaId}`}
                          value={criteriaScore.criteriaScoreId}
                          onChange={handleCriteriaScoreChange}
                        />
                        <span>{criteriaScore.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <input type="submit"></input>
            </form>
          ))}
        </div>
      </main>
    </div>
  )
}
