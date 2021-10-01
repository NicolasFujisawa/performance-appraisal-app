import { CriteriaScore } from '@/entity/criteriaScore.entity';
import { Method } from '@/entity/method.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Criteria {
  @PrimaryGeneratedColumn({ name: 'criteria_id' })
  criteriaId: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @ManyToMany(() => Method)
  method: Method[];

  @OneToMany(() => CriteriaScore, criteriaScore => criteriaScore.criteria)
  criteriaScores: CriteriaScore[];
}
