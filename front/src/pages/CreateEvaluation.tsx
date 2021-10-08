import '../styles/pages/main-page.css'
import '../styles/pages/create-evaluation-page.css'
import { getMethods, getTeams, createEvaluation } from '../services/api'
import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { MethodsResponse } from '../interfaces/methods.response'
import { TeamsResponse } from '../interfaces/teams.response'
interface FormValues {
  name: string
  start: string
  end: string
  isLastEvaluation: boolean
  methodId: number
  teamId: number
}

export default function Evaluation() {
  const [methods, setMethods] = useState<MethodsResponse>()
  const [teams, setTeams] = useState<TeamsResponse>()
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    start: '2021-07-10',
    end: '',
    isLastEvaluation: true,
    methodId: 0,
    teamId: 0,
  })

  const loadMethod = async () => {
    const {
      data: { data },
    } = await getMethods()
    setMethods(data)
  }
  const loadTeam = async () => {
    const {
      data: { data },
    } = await getTeams()
    setTeams(data)
  }

  useEffect(() => {
    loadMethod()
    loadTeam()
  }, [])

  function buildRequestPayload() {
    return {
      name: formValues.name,
      start: formValues.start,
      end: formValues.end,
      isLastEvaluation: formValues.isLastEvaluation,
      method: { methodId: formValues.methodId },
      team: { teamId: formValues.teamId },
    }
  }
  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const payload = buildRequestPayload()
    const result = await createEvaluation(payload)
    alert(`Avaliação ${result.data.data.name} criada com sucesso!`)
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormValues((prevValues) => {
      return { ...prevValues, [name]: value }
    })
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target
    let intvalue = parseInt(value, 10)
    setFormValues((prevValues) => {
      return { ...prevValues, [name]: isNaN(intvalue) ? 0 : intvalue }
    })
  }

  return (
    <div id="page-component">
      <form id="page-container" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Nova Avaliação</legend>
          <div className="input-block">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formValues.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-block">
            <label htmlFor="teamId">Time</label>
            <select
              name="teamId"
              required
              value={formValues.teamId}
              onChange={handleSelectChange}
            >
              <option value=""></option>
              {teams?.map((team) => (
                <option value={team.teamId}>{team.name}</option>
              ))}
            </select>
          </div>
          <div className="input-block">
            <label htmlFor="methodId">Métodos</label>
            <select
              name="methodId"
              required
              value={formValues.methodId}
              onChange={handleSelectChange}
            >
              <option value=""></option>
              {methods?.map((methods) => (
                <option value={methods.methodId}>{methods.name}</option>
              ))}
            </select>
          </div>
          <div className="input-block">
            <label htmlFor="date">Data Final</label>
            <input
              type="date"
              id="date"
              name="end"
              required
              value={formValues.end}
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="input-block">
            <label>Manter Anonimato?</label>
            <div>
              <input type="radio" value="1" name="anonymous" required checked={formValues.anonymous == 1}/>
              <label>Sim</label>
            </div>
            <div>
              <input type="radio" value="2" name="anonymous" checked={formValues.anonymous == 2}/>
              <label>Não</label>
            </div>
          </div> */}
          <button className="create-method" type="submit">
            Confirmar
          </button>
        </fieldset>
      </form>
    </div>
  )
}
