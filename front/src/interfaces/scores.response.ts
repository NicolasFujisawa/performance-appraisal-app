import { CriteriaScoreResponse } from './criterias.response';

export type ScoresResponses = ScoresResponse[];

export type ScoresResponse = {
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