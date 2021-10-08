import { useState } from 'react'
import DeleteButton from '../commons/components/DeleteButton'
import { CriteriaResponse } from '../interfaces/criterias.response'
import '../styles/pages/main-page.css'
import '../styles/pages/method-page.css'

const mockCriterias: CriteriaResponse[] = [
  {} as CriteriaResponse,
  {
    criteriaId: 1,
    name: 'Criteria 1',
    criteriaScores: [],
  },
  {
    criteriaId: 2,
    name: 'Criteria 2',
    criteriaScores: [],
  },
  {
    criteriaId: 3,
    name: 'Criteria 3',
    criteriaScores: [],
  },
]

export default function Method() {
  const [criterias, setCriterias] =
    useState<Array<CriteriaResponse>>(mockCriterias)
  const [chosenCriterias, setChosenCriterias] = useState<
    Array<CriteriaResponse>
  >([])
  const [name, setName] = useState('')

  // nao gostou muda
  const handleChange = (e: any) => {
    const { value } = e.target

    const newChosenCriteria = criterias.find(
      (criteria) => criteria.name === value
    )
    const newCriterias = criterias.filter((criteria) => criteria.name !== value)

    setCriterias(newCriterias)
    setChosenCriterias([...chosenCriterias, newChosenCriteria!])
  }

  const handleRemove = (criteriaId: number) => {
    const criteriaToRemove = chosenCriterias.find(
      (criteria) => criteria.criteriaId === criteriaId
    )
    const newCriterias = [...criterias, criteriaToRemove!]
    const newChosenCriterias = chosenCriterias.filter(
      (chosenCriteria) => chosenCriteria !== criteriaToRemove
    )

    setCriterias(newCriterias)
    setChosenCriterias(newChosenCriterias)
  }

  const handleSubmit = () => {}

  return (
    <div id="page-component">
      <main>
        <form id="page-container" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>
            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <div className="method-name-input">
                <input
                  id="name"
                  placeholder="Nome do Método"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            </div>

            <div className="input-block">
              <label htmlFor="name">Critérios</label>
              <select className="drop-down" value={''} onChange={handleChange}>
                {criterias.map((criteria: CriteriaResponse) => (
                  <option
                    key={criteria.criteriaId}
                    value={criteria.name}
                    className="drop-down-option"
                  >
                    {criteria.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="criteria-list">
              {chosenCriterias.map((criteria: CriteriaResponse) => (
                <div className="criteria-item" key={criteria.criteriaId}>
                  <div className="item-name">
                    <p>{criteria.name}</p>
                  </div>
                  <DeleteButton
                    action={handleRemove}
                    id={criteria.criteriaId}
                  />
                </div>
              ))}
            </div>
            <button className="confirm-button" type="submit">
              Confirmar
            </button>
          </fieldset>
        </form>
      </main>
    </div>
  )
}
