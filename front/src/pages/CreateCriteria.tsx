import { FormEvent, useState } from 'react'
import DeleteButton from '../commons/components/DeleteButton'
import {
  CriteriaPayload,
  CriteriaScorePayload,
} from '../interfaces/criterias.scores.payload'
import { sendCriteria } from '../services/api'
import { FiPlus } from 'react-icons/fi'
import '../styles/pages/main-page.css'
import '../styles/pages/create-criteria-page.css'

export default function CreateCriteria() {
  const [name, setName] = useState('')
  const [criteriaScore, setCriteriaScore] = useState('')
  const [value, setValue] = useState(0)
  const [criteria, setCriteria] = useState<CriteriaPayload>(
    {} as CriteriaPayload
  )

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const result = await sendCriteria(criteria)
    alert(result.data)

    clearData()
  }

  function clearData() {
    setName('')
    setCriteriaScore('')
    setValue(0)
    setCriteria({} as CriteriaPayload)
  }

  function handleCriteriaScore() {
    const criteriaClone = criteria
    const newCriteriaScore = { name: criteriaScore, value: value }

    if (criteria.criteriaScores === undefined) {
      criteria.criteriaScores = [] as CriteriaScorePayload[]
    }

    criteriaClone.criteriaScores.push(newCriteriaScore)
    setCriteria(criteriaClone)
    setCriteriaScore('')
    setValue(value + 1)
  }

  function handleDelete(id: number) {
    const criteriaClone = criteria

    const criteriaScoresFiltered = criteriaClone.criteriaScores.filter(
      (criteria) => criteria.value !== id
    )
    criteriaClone.criteriaScores = sortCriteriasValue(criteriaScoresFiltered)
    setCriteria(criteriaClone)
    setValue(value - 1)
  }

  function sortCriteriasValue(
    criteriaScores: CriteriaScorePayload[]
  ): CriteriaScorePayload[] {
    const criteriasSorted = criteriaScores.sort((props) => props.value)
    criteriasSorted.forEach(function (value, index, array) {
      array[index].value = index
    }, criteriasSorted)
    return criteriasSorted
  }

  return (
    <div id="page-component">
      <main>
        <form id="page-container" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Critério</legend>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                placeholder="Nome do Critério"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="input-block">
              <label htmlFor="criterias">Notas</label>
              <div className="criteria-score-input">
                <input
                  type="text"
                  id="criterias"
                  placeholder="Adicione suas notas"
                  value={criteriaScore}
                  onChange={(event) => setCriteriaScore(event.target.value)}
                />
                <button
                  className="create-criteria-score"
                  onClick={handleCriteriaScore}
                  type="button"
                >
                  <FiPlus size={24} color="#FFF" />
                </button>
              </div>
            </div>

            <div className="criteria-score-list">
              {criteria?.criteriaScores?.map((props) => {
                return (
                  <div className="criteria-score-item" key={props.value}>
                    <div className="item-name">
                      <p>{props.value}</p>
                      {props.name !== '' && <p> - {props.name}</p>}
                    </div>
                    <DeleteButton action={handleDelete} id={props.value} />
                  </div>
                )
              })}
            </div>
            <button className="create-criteria" type="submit">
              Confirmar
            </button>
          </fieldset>
        </form>
      </main>
    </div>
  )
}
