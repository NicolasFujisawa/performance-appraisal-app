import { Method } from '@/entity/method.entity';
import { Score } from '@/entity/score.entity';
import { Team } from '@/entity/team.entity';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn({ name: 'evaluation_id' })
  evaluationId: number;

  @Column()
  name: string;

  @Column()
  @IsNotEmpty()
  start: Date;

  @Column()
  end: Date;

  @Column()
  @IsBoolean()
  isLastEvaluation: boolean;

  @Column()
  @IsBoolean()
  isAnonymous: boolean;

  @ManyToOne(() => Method, method => method.evaluations)
  @JoinColumn({ name: 'method_id' })
  method: Method;

  @ManyToOne(() => Team, team => team.evaluations)
  team: Team;

  @OneToMany(() => Score, score => score.evaluation)
  scores: Score[];
}
