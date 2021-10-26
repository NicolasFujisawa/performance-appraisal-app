import { Evaluation } from '@/entity/evaluation.entity';
import { TeamMember } from '@/entity/teamMember.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Score } from './score.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn({ name: 'student_id' })
  studentId: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  ra: string;

  @OneToMany(() => TeamMember, member => member.student)
  teams: TeamMember[];

  @OneToMany(() => Score, score => score.evaluatorStudent)
  evaluationsMade: Evaluation[];

  @OneToMany(() => Score, score => score.evaluatedStudent)
  evaluationsReceived: Evaluation[];
}
