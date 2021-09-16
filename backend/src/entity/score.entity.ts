import { CriteriaScore } from '@/entity/criteriaScore.entity';
import { Evaluation } from '@/entity/evaluation.entity';
import { Student } from '@/entity/student.entity';
import { Teacher } from '@/entity/teacher.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Score {
  @PrimaryGeneratedColumn({ name: 'score_id' })
  scoreId: number;

  @ManyToOne(() => Student, student => student.evaluationsReceived)
  @JoinColumn({ name: 'evaluated_student_id' })
  evaluatedStudent: Student;

  @ManyToOne(() => Student, student => student.evaluationsMade)
  @JoinColumn({ name: 'evaluator_student_id' })
  evaluatorStudent: Student;

  @ManyToOne(() => Teacher, teacher => teacher.evaluationsMade)
  @JoinColumn({ name: 'evaluator_teacher_id' })
  evaluatorTeacher: Teacher;

  @ManyToOne(() => CriteriaScore, criteriaScore => criteriaScore.scores)
  @JoinColumn({ name: 'criteria_score_id' })
  criteriaScore: CriteriaScore;

  @ManyToOne(() => Evaluation, evaluation => evaluation.scores)
  @JoinColumn({ name: 'evaluation_id' })
  evaluation: Evaluation;
}
