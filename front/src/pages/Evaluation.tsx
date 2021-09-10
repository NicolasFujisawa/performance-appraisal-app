import '../styles/pages/main-page.css'
import api from '../services/api'
import { useState, useEffect, FormEvent } from 'react'

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

export default function Evaluation() {
  const [evaluation, setEvalaution] = useState<Evaluation>({
    id: 0,
    team_name: 'Leo',
    person: ['Leo'],
  })
  useEffect(() => {
    setEvalaution({ id: 1, team_name: 'Nicolas', person: ['Nicolas'] })
  })

  function handleSubmit(event: FormEvent) {
    alert('Você clicou no botão')
    event.preventDefault()
  }

  return (
    <div id="page-component">
      <main>
        <div id="page-container">
          <h1>Avaliar</h1>
          <h3>{evaluation.team_name}</h3>
          <hr />
          <form onSubmit={handleSubmit}>
            <p>Criteria Name</p>
            <input type="radio" name="teste" />
            <label>asidasiudbas</label>
            <input type="radio" name="teste" />
            <label>asidasiudbas</label>
            <input type="submit"></input>
          </form>
        </div>
      </main>
    </div>
  )
}
