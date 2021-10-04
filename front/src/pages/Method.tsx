import { useState } from 'react'
import { CriteriaResponse } from '../interfaces/criterias.response'
import '../styles/pages/main-page.css'
import '../styles/pages/method-page.css'


const mockCriterias: CriteriaResponse[] = [
  {} as any,
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
];

export default function Method() {
  const [criterias, setCriterias] = useState<Array<CriteriaResponse>>(mockCriterias)
  const [chosenCriterias, setChosenCriterias] = useState<Array<CriteriaResponse>>(
    []
  )

  const handleChange = (e: any) => {
    const { value } = e.target

    const [newChosenCriteria] = criterias.filter(criteria => criteria.name === value)
    const newCriterias = criterias.filter(
      (criteria) => criteria.name !== value
    )

    setCriterias(newCriterias)
    setChosenCriterias([...chosenCriterias, newChosenCriteria])
  }

  const handleRemove = (criteria: CriteriaResponse) => {
    const newCriterias = [...criterias, criteria]
    const newChosenCriterias = chosenCriterias.filter(
      (chosenCriteria) => chosenCriteria !== criteria
    )

    setCriterias(newCriterias)
    setChosenCriterias(newChosenCriterias)
  }


  return (
    <div id="page-component">
      <main>
        <div id="page-container">
          <h1>Dados</h1>
          <br />
          <form>
            <label>
              Nome
              <br />
              <input className="drop-down" type="text" name="name" />
            </label>
            <br />
            <label>
              Critérios
              <br />
              <select className="drop-down" value={''} onChange={handleChange}>
                {criterias.map((criteria: CriteriaResponse) => (
                  <option key={criteria.criteriaId} value={criteria.name}>
                    {criteria.name}
                  </option>
                ))}
              </select>
            </label>
            {chosenCriterias.map((criteria: CriteriaResponse) => (
              <div key={criteria.criteriaId}>
                <label>
                  {criteria.name}
                  <button onClick={() => handleRemove(criteria)}>x</button>
                </label>
              </div>
            ))}
            <br />
            <br />
            <button className="confirm-button" type="submit">
              Confirmar
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
