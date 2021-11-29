import { useEffect, useState } from 'react'
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from 'recharts'
import { ScoresResponse as IScoresResponse } from '../../interfaces/scores.response'
import { Evaluation as IEvaluation } from '../../interfaces/evaluation'
import { CriteriaResponse } from '../../interfaces/criterias.response'

interface DataChart {
  subject: string
  [key: string]: any
  fullMark: number
}

export default function EvaluationChart(props: any) {
  const {
    scores,
    evaluation,
    evaluatedName,
  }: {
    scores: IScoresResponse
    evaluation: IEvaluation
    evaluatedName: string
  } = props
  const [dataChart, setDataChart] = useState<DataChart[]>()

  useEffect(() => {
    createDataChart()
  }, [])

  function createDataChart() {
    const criterias = evaluation.method.criterias

    const newSubjects = criterias.map((criteria): DataChart => {
      const scoresValuesList = scoresValues(criteria)

      return {
        subject: criteria.name,
        fullMark: 100,
        uniqueId: criteriaScoreAverage(scoresValuesList, criteria),
      }
    })
    setDataChart(newSubjects)
  }

  function scoresValues(criteria: CriteriaResponse): number[] {
    return scores
      .filter(
        (score) =>
          criteria.criteriaId === score.criteriaScore.criteria.criteriaId
      )
      .map((score) => score.criteriaScore.value)
  }

  function criteriaScoreAverage(
    scoreValues: number[],
    criteria: CriteriaResponse
  ): number {
    const scoresValuesSum = scoreValues.reduce((a, b) => a + b, 0)

    const scoresValuesAverage = scoresValuesSum / scoreValues.length || 0

    const criteriaScoreLength = criteria.criteriaScores?.length || 0
    return (scoresValuesAverage / criteriaScoreLength) * 100 || 0
  }

  if (!scores.length)
    return (
      <div>
        <p>{evaluatedName} não recebeu avaliações.</p>
      </div>
    )

  return (
    <RadarChart outerRadius={90} width={570} height={250} data={dataChart}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={90} domain={[0, 100]} />

      <Radar
        name={evaluatedName}
        dataKey="uniqueId"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
      <Legend />
    </RadarChart>
  )
}
