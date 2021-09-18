import { CriteriaScoreResponse } from './criterias.response';

export type ScoresResponse = ScoreResponse[];

export type ScoreResponse = {
    scoreId: number,
    evaluatedStudent: {
        studentId: number,
        name: string,
        ra: number,
    },
    evaluatorStudent: {
        studentId: number,
        name: string,
        ra: number,
    },
    criteriaScore: CriteriaScoreResponse,
}
