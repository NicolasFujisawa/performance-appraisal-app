import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import EvaluationChart from '../commons/components/EvaluationChart'
import NoPermission from '../commons/components/NoPermissions'
import SideBar from '../commons/components/SideBar'
import { Evaluation as IEvaluation } from '../interfaces/evaluation'
import { ScoresResponse as IScoresResponse } from '../interfaces/scores.response'
import { TeamMember } from '../interfaces/team'
import { getEvaluationScores, getEvaluation } from '../services/api'
import { selectUser } from '../store/selectors'
import '../styles/pages/teacher-results.css'

interface TeacherResultsParams {
  evaluation_id: string
}

export default function TeacherResults() {
  const [scores, setScores] = useState<IScoresResponse>()
  const [evaluation, setEvaluation] = useState<IEvaluation>()
  const params = useParams<TeacherResultsParams>()
  const { role } = useSelector(selectUser)

  useEffect(() => {
    const loadScores = async () => {
      const {
        data: { data },
      } = await getEvaluationScores(parseInt(params.evaluation_id))

      setScores(data)
    }
    const loadEvaluation = async () => {
      const {
        data: { data },
      } = await getEvaluation(parseInt(params.evaluation_id))
      setEvaluation(data)
    }
    loadScores()
    loadEvaluation()
  }, [params])

  function getScoresFromMember(member: TeamMember) {
    return scores?.filter(
      (score) =>
        score.evaluatedStudent.studentId === member.student.studentId &&
        score.evaluatorStudent.studentId !== member.student.studentId
    )
  }

  if (role !== 'teacher') {
    return (
      <div id="page-component">
        <SideBar />
        <NoPermission />
      </div>
    )
  }

  return (
    <div id="page-component">
      <SideBar />
      <main>
        <div id="page-container">
          <h1>Resultados das avaliações</h1>
          <h3>
            {evaluation?.team?.name} - {evaluation?.name}
          </h3>
          <div className="results-charts">
            {evaluation?.team.members.map((member) => (
              <div className="charts-content" key={member.teamMemberId}>
                <EvaluationChart
                  evaluatedName={member.student.name}
                  scores={getScoresFromMember(member)}
                  evaluation={evaluation}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
