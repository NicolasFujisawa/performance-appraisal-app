import { Team } from '@/entity/team.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  teacher_id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => Team, team => team.teacher)
  teams: Team[];
}
