import { Criteria } from '@/entity/criteria.entity';
import { Score } from '@/entity/score.entity';
import { IsNotEmpty, IsPositive } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CriteriaScore {
  @PrimaryGeneratedColumn({ name: 'criteria_score_id' })
  criteriaScoreId: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsPositive()
  value: number;

  @ManyToOne(() => Criteria, criteria => criteria.criteriaScores)
  @JoinColumn({ name: 'criteria_id' })
  criteria: Criteria;

  @OneToMany(() => Score, score => score.criteriaScore)
  scores: Score[];
}
