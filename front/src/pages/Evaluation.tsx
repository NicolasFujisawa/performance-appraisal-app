import '../styles/pages/main-page.css'
import { getCriterias, sendEvaluationScores } from '../services/api'
import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { CriteriasResponse } from '../interfaces/criterias.response'
import { useParams } from 'react-router'
import { SendEvaluationScoresPayload } from '../interfaces/send.evaluation.scores.payload'

interface Evaluation {
  id: number
  team_name: string
  person: Array<string>
}

interface Model {
  model_name: string
  criteria: Array<{
    id: number
    item: Array<string>
    selected_item: string
  }>
}

interface FormValues {
  criterias: {
    [key: string]: number
  }
}

export default function Evaluation() {
  const [evaluation, setEvalaution] = useState<Evaluation>({
    id: 1,
    team_name: 'Leo',
    person: ['Leo'],
  })

  const params = useParams()

  const [criterias, setCriterias] = useState<CriteriasResponse>()
  const [formValues, setFormValues] = useState<FormValues>({ criterias: {} })

  const loadCriterias = async () => {
    const criteriasResponse = await getCriterias(1)
    setCriterias(criteriasResponse)
  }

  useEffect(() => {
    setEvalaution({ id: 1, team_name: 'Nicolas', person: ['Nicolas'] })

    loadCriterias()
  }, [params])

  function buildRequestPayload(): SendEvaluationScoresPayload {
    return Object.entries(formValues.criterias).map(([key, value]) => ({
      evaluatedStudent: 1,
      evaluatorStudent: 2,
      evaluatorTeacher: 1,
      criteriaScore: value,
      evaluation: evaluation.id,
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
    const criteriaId = name.split('-')[1]
    newFormValues.criterias[criteriaId] = parseInt(value)
    setFormValues(newFormValues)
  }

  return (
    <div id="page-component">
      <main>
        <div id="page-container">
          <h1>Avaliar</h1>
          <h3>{evaluation.team_name}</h3>
          <hr />
          <form onSubmit={handleSubmit}>
            {criterias?.map((criteria) => (
              <div key={`criteria-${criteria.criteriaId}`}>
                <h1>{criteria.name}</h1>
                <div>
                  {criteria.citeriaScores.map((criteriaScore) => (
                    <div key={`criteria-score-${criteriaScore.citeriaScoreId}`}>
                      <input
                        type="radio"
                        name={`criteria-${criteria.criteriaId}`}
                        value={criteriaScore.citeriaScoreId}
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
        </div>
      </main>
    </div>
  )
}
