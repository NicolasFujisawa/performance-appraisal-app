import { Team } from '@/entity/team.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Method } from '@/entity/method.entity';
import { Score } from '@/entity/score.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  teacher_id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => Team, team => team.teacher)
  teams: Team[];

  @OneToMany(() => Method, method => method.teacher)
  methods: Method[];

  @OneToMany(() => Score, score => score.evaluatorTeacher)
  evaluationsMade: Score[];
}
