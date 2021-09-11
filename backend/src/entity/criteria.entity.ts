import { CriteriaScore } from '@/entity/criteriaScore.entity';
import { Method } from '@/entity/method.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Criteria {
  @PrimaryGeneratedColumn()
  criteriaId: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @ManyToOne(() => Method, method => method.criterias)
  @JoinColumn({ name: 'method_id' })
  method: Method;

  @OneToMany(() => CriteriaScore, criteriaScore => criteriaScore.criteria)
  criteriaScores: CriteriaScore[];
}
