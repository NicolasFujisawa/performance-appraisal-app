import { FormEvent, useEffect, useState } from 'react'
import DeleteButton from '../commons/components/DeleteButton'
import SideBar from '../commons/components/SideBar'
import { CreateMethodPayload } from '../interfaces/create.method.payload'
import {
  CriteriaResponse,
  CriteriasResponse,
} from '../interfaces/criterias.response'
import { createMethod, getCriterias } from '../services/api'
import '../styles/pages/main-page.css'
import '../styles/pages/method-page.css'

export default function Method() {
  const [criterias, setCriterias] = useState<CriteriasResponse>([])
  const [chosenCriterias, setChosenCriterias] = useState<CriteriaResponse[]>([])
  const [name, setName] = useState('')

  const loadCriterias = async () => {
    const {
      data: { data: criterias },
    } = await getCriterias()

    setCriterias([{} as CriteriaResponse, ...criterias])
  }

  useEffect(() => {
    loadCriterias()
  }, [])

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

  const buildPayload = () =>
    ({
      name,
      teacher: 1,
      criterias: chosenCriterias,
    } as CreateMethodPayload)

  const checkForm = () => {
    if (!chosenCriterias.length) throw new Error('Lista de criterios vazia')
    if (!name.trim().length) throw new Error('Nome invalido')
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    checkForm()
    const payload = buildPayload()
    await createMethod(payload)
    setChosenCriterias([])
    setName('')
  }

  return (
    <div id="page-component">
      <SideBar />
      <main>
        <form id="page-container" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Novo Método</legend>
            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <div className="method-name-input">
                <input
                  id="name"
                  placeholder="Nome do Método"
                  value={name}
                  required
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
