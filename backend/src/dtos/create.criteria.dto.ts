import { CriteriaScore } from '@/entity/criteriaScore.entity';

export interface CreateCriteriaDto {
  name: string;
  criteriaScores: CriteriaScore[];
}
