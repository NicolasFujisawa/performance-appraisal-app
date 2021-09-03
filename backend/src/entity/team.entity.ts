import { Teacher } from '@/entity/teacher.entity';
import { TeamMember } from '@/entity/teamMember.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  team_id: number;

  @ManyToOne(() => Teacher, teacher => teacher.teams)
  @JoinColumn({ name: 'team_id' })
  teacher: Teacher;

  @Column()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => TeamMember, member => member.team)
  members: TeamMember[];
}
