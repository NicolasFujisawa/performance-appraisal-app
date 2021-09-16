import { Criteria } from '@/entity/criteria.entity';
import { Evaluation } from '@/entity/evaluation.entity';
import { Teacher } from '@/entity/teacher.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Method {
  @PrimaryGeneratedColumn({ name: 'method_id' })
  methodId: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @ManyToOne(() => Teacher, teacher => teacher.methods)
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @OneToMany(() => Criteria, criteria => criteria.method)
  criterias: Criteria[];

  @OneToMany(() => Evaluation, evaluation => evaluation.method)
  evaluations: Evaluation[];
}
