import { CriteriaScore } from '@/entity/criteriaScore.entity';
import { Evaluation } from '@/entity/evaluation.entity';
import { Student } from '@/entity/student.entity';
import { Teacher } from '@/entity/teacher.entity';

export interface CreateScoreDto {
  evaluatedStudent: Student;
  evaluatorStudent: Student | null;
  evaluatorTeacher: Teacher | null;
  criteriaScore: CriteriaScore;
  evaluation: Evaluation;
}
