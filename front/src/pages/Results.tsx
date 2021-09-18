import '../styles/pages/main-page.css'
import { Evaluation as IEvaluation } from '../interfaces/evaluation'
import { useState } from 'react'
import { getEvaluation } from '../services/api'
import { CriteriasResponse } from '../interfaces/criterias.response'
import { Student } from '../interfaces/team'

export default function Results() {
  const [evaluation, setEvaluation] = useState<IEvaluation>({} as any)
  const [students, setStudents] = useState<Student>({} as any)

  return (
    <div id="page-container">
      <h1>Avaliação</h1>
      <h4>{evaluation.end} - Finished</h4>
      <h4>{evaluation.team?.name}</h4>
      <br />
      <h1>Resultados</h1>
      <h5>{students.name}</h5>
      <p>Criterio 1:3</p>
      <p>Criterio 2:2</p>
      <p>Criterio 3:3</p>
    </div>
  )
}
