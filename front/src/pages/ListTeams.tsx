import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SideBar from '../commons/components/SideBar'
import { TeamsResponse } from '../interfaces/teams.response'
import { getTeams } from '../services/api'
import '../styles/pages/main-page.css'
import '../styles/pages/results-page.css'
import '../styles/pages/list-team-page.css'

export default function ListTeams() {
  const [teams, setTeams] = useState<TeamsResponse>()

  const loadTeams = async () => {
    const {
      data: { data },
    } = await getTeams()

    setTeams(data)
  }

  useEffect(() => {
    loadTeams()
  }, [])

  return (
    <div id="page-component">
      <SideBar />
      <main>
        <div id="page-container">
          <h1>Equipes</h1>
          {teams?.map((team) => (
            <div id="teams-block">
              <Link id="link" to={`/teams/${team.teamId}`}>
                <div key={`team-block-${team.teamId}`}>
                  <span>{team.name}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
