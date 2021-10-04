import '../styles/pages/main-page.css'
import '../styles/pages/create-evaluation-page.css'
import { getMethods } from '../services/api'
import { useState, useEffect } from 'react'
import { MethodsResponse } from '../interfaces/methods.response'

export default function Evaluation() {
  const [methods, setMethods] = useState<MethodsResponse>()
  const loadCriteria = async () => {
    const {
      data: { data },
    } = await getMethods()
    setMethods(data)
  }

  useEffect(() => {
    loadCriteria()
  }, [])

  return (
    <div id="page-component">
      <form id="page-container">
        <fieldset>
          <legend>Dados</legend>
          <div className="input-block">
            <label htmlFor="name">Nome</label>
            <input type="text" id="name" />
          </div>
          <div className="input-block">
            <label htmlFor="methods">Métodos</label>
            <select>
              {methods?.map((methods) => (
                <option value={methods.methodId}>{methods.name}</option>
              ))}
            </select>
          </div>
          <div className="input-block">
            <label>Manter Anonimato?</label>
            <div>
              <input type="radio" value="1" name="anonymous" />
              <label>Sim</label>
            </div>
            <div>
              <input type="radio" value="2" name="anonymous" checked />
              <label>Não</label>
            </div>
          </div>
          <button className="create-method" type="submit">
            Confirmar
          </button>
          .
        </fieldset>
      </form>
    </div>
  )
}
