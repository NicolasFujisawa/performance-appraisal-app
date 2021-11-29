import { FormEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import SideBar from '../commons/components/SideBar'
import { Evaluation } from '../interfaces/evaluation'
import { StudentJoinTeam } from '../interfaces/student.join.team'
import { Team } from '../interfaces/team'
import {
  getEvaluationByTeam,
  getTeamById,
  studentJoinTeam,
} from '../services/api'
import { selectUser } from '../store/selectors'
import '../styles/pages/team-page.css'

interface TeamParams {
  team_id: string
}

export function TeamPage() {
  const params = useParams<TeamParams>()
  const teamId = parseInt(params.team_id)
  const { role, userId } = useSelector(selectUser)

  const [evaluations, setEvaluations] = useState<Evaluation[]>()
  const [team, setTeam] = useState<Team>()

  useEffect(() => {
    const loadEvaluations = async () => {
      const {
        data: { data },
      } = await getEvaluationByTeam(teamId)
      setEvaluations(data)
    }
    const loadTeam = async () => {
      const {
        data: { data },
      } = await getTeamById(teamId)
      setTeam(data)
    }
    loadEvaluations()
    loadTeam()
  }, [])

  async function handleJoin(event: FormEvent) {
    event.preventDefault()

    const payload: StudentJoinTeam = {
      studentId: userId,
      teamId,
    }

    try {
      await studentJoinTeam(payload)

      const teamMembers = [
        ...(team?.members as any),
        {
          teamMemberId: 1,
          student: { studentId: userId },
        },
      ]
      const newTeam: Team = { ...team, members: teamMembers } as Team

      setTeam(newTeam)

      alert('Voce ingressou na equipe!')
    } catch (error) {
      alert('Ocorreu algum erro. Tente novamente mais tarde.')
    }
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
          <h1 className="title">Equipe</h1>
          <h2>{team?.name}</h2>
          <h1 className="title">Participantes</h1>
          {team?.members.map((member) => {
            return (
              <div className="item-member" key={member.teamMemberId}>
                <p>{member.student.name}</p>
              </div>
            )
          })}
          <h1 className="title">Avaliações</h1>
          {evaluations?.map((evaluation) => {
            return (
              <div className="item-evaluation" key={evaluation.evaluationId}>
                {isEvaluationFinished(evaluation) ? (
                  <Link
                    className="link"
                    to={`/evaluation/${evaluation.evaluationId}/evaluatedStudent/${userId}/results`}
                  >
                    {evaluation.name} - Finalizada
                  </Link>
                ) : (
                  <Link
                    className="link"
                    to={`/evaluation/${evaluation.evaluationId}`}
                  >
                    {evaluation.name} - Em Andamento
                  </Link>
                )}
                {role === 'teacher' && (
                  <Link
                    className="link"
                    to={`/evaluation/${evaluation.evaluationId}/results`}
                  >
                    Ver Resultados
                  </Link>
                )}
              </div>
            )
          })}
          {role === 'teacher' && (
            <Link className="link" to="/evaluation/new">
              <div id="newEvaluation">Nova Avaliação</div>
            </Link>
          )}
          {role === 'student' && isUserNotInTeam() && (
            <>
              <button className="join-button" onClick={handleJoin}>
                Ingressar na equipe
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
