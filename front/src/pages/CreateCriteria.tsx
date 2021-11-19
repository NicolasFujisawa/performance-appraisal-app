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
import SideBar from '../commons/components/SideBar'
import NoPermission from '../commons/components/NoPermissions'
import { useAppSelector } from '../store/hooks'
import { selectUser } from '../store/selectors'

export default function CreateCriteria() {
  const [name, setName] = useState('')
  const [criteriaScore, setCriteriaScore] = useState('')
  const [criteriaScoreIndexer, setCriteriaScoreIndexer] = useState(1)
  const [criteria, setCriteria] = useState<CriteriaPayload>(
    {} as CriteriaPayload
  )
  const { role } = useAppSelector(selectUser)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const result = await sendCriteria({ ...criteria, name })
    alert('Critério criado com sucesso')

    clearData()
  }

  function clearData() {
    setName('')
    setCriteriaScore('')
    setCriteriaScoreIndexer(1)
    setCriteria({} as CriteriaPayload)
  }

  function handleCriteriaScore() {
    const criteriaClone = criteria
    const newCriteriaScore = {
      name: criteriaScore,
      value: criteriaScoreIndexer,
    }

    if (criteria.criteriaScores === undefined) {
      criteria.criteriaScores = [] as CriteriaScorePayload[]
    }

    criteriaClone.criteriaScores.push(newCriteriaScore)
    setCriteria(criteriaClone)
    setCriteriaScore('')
    setCriteriaScoreIndexer(criteriaScoreIndexer + 1)
  }

  function handleDelete(id: number) {
    const criteriaClone = criteria

    const criteriaScoresFiltered = criteriaClone.criteriaScores.filter(
      (criteria) => criteria.value !== id
    )
    criteriaClone.criteriaScores = sortCriteriasValue(criteriaScoresFiltered)
    setCriteria(criteriaClone)
    setCriteriaScoreIndexer(criteriaScoreIndexer - 1 || 1)
  }

  function sortCriteriasValue(
    criteriaScores: CriteriaScorePayload[]
  ): CriteriaScorePayload[] {
    const criteriasSorted = criteriaScores.sort((props) => props.value)
    criteriasSorted.forEach(function (value, index, array) {
      array[index].value = index + 1
    }, criteriasSorted)
    return criteriasSorted
  }

  if (role !== 'teacher') {
    return (
      <div id="page-component">
        <SideBar />
        <NoPermission />
      </div>
    )
  }

  return (
    <div id="page-component">
      <SideBar />
      <main>
        <form id="page-container" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Novo Critério</legend>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                placeholder="Nome do Critério"
                value={name}
                required
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
