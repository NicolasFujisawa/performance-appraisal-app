import { TeamMember } from '@/entity/teamMember.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  ra: number;

  @OneToMany(() => TeamMember, member => member.student)
  teams: TeamMember[];
}
