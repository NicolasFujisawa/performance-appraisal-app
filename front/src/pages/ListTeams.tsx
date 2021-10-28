import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SideBar from '../commons/components/SideBar'
import { TeamsResponse } from '../interfaces/teams.response'
import { getTeams } from '../services/api'
import '../styles/pages/main-page.css'
import '../styles/pages/results-page.css'

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
          <div id="teams-block">
            {teams?.map((team) => (
              <div key={`team-block-${team.teamId}`}>
                <span>{team.name}</span>
                <Link to={`/teams/${team.teamId}`}>Ver</Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
