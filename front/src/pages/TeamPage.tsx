import { FormEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import SideBar from '../commons/components/SideBar'
import { Evaluation } from '../interfaces/evaluation'
import { Student, Team, TeamMember } from '../interfaces/team'
import { getEvaluationByTeam } from '../services/api'
import { selectUser } from '../store/selectors'

interface TeamParams {
  team_id: string
}

const getTeam = {
  data: {
    members: [
      {
        student: { name: 'jabbinho', studentId: 1 } as Student,
        teamMemberId: 1,
      },
      {
        student: { name: 'roe', studentId: 2 } as Student,
        teamMemberId: 2,
      },
    ] as TeamMember[],
    name: 'Hadowken team',
    teamId: 1,
  } as Team,
}

export function TeamPage() {
  const params = useParams<TeamParams>()
  const teamId = parseInt(params.team_id)
  const { role, userId } = useSelector(selectUser)

  const [evaluations, setEvaluations] = useState<Evaluation[]>()
  const [team, setTeam] = useState<Team>() // TODO tipo GetTeam (tem o formato = {data: {Team}})

  useEffect(() => {
    const loadEvaluations = async () => {
      const {
        data: { data },
      } = await getEvaluationByTeam(teamId)
      setEvaluations(data)
    }
    const loadTeam = () => {
      const { data } = getTeam // TODO criar serviço no back/front para pegar um team por id
      setTeam(data)
    }
    loadEvaluations()
    loadTeam()
  }, [])

  function handleJoin(event: FormEvent) {
    event.preventDefault()
    // TODO criar api para entrar no time
  }

  function isUserNotInTeam() {
    return !team?.members.find((member) => member.student.studentId === userId)
  }

  function isEvaluationFinished(evaluation: Evaluation) {
    const now = new Date().getTime()
    const evaluationEnd = Date.parse(evaluation.end)
    return now > evaluationEnd
  }

  return (
    <div id="page-component">
      <SideBar />
      <main>
        <div id="page-container">
          {role === 'student' && isUserNotInTeam() && (
            <>
              <button onSubmit={handleJoin}>Ingressar</button>
            </>
          )}
          <h1>Equipe</h1>
          <h2>{team?.name}</h2>
          <h1>Participantes</h1>
          {team?.members.map((member) => {
            return (
              <div className="item-member" key={member.teamMemberId}>
                <p>{member.student.name}</p>
              </div>
            )
          })}
          <h1>Avaliações</h1>
          {evaluations?.map((evaluation) => {
            return (
              <div className="item-evaluation" key={evaluation.evaluationId}>
                {isEvaluationFinished(evaluation) ? (
                  <Link
                    to={`/evaluation/${evaluation.evaluationId}/evaluatedStudent/${userId}/results`}
                  >
                    {evaluation.name} - Finalizada
                  </Link>
                ) : (
                  <Link to={`/evaluation/${evaluation.evaluationId}`}>
                    {evaluation.name} - Em Andamento
                  </Link>
                )}
              </div>
            )
          })}
          {role === 'teacher' && (
            <>
              <Link to="/evaluation/new">Nova Avaliação</Link>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
