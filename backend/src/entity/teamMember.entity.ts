import { Student } from '@/entity/student.entity';
import { Team } from '@/entity/team.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TeamMember {
  @PrimaryGeneratedColumn({ name: 'team_member_id' })
  teamMemberId: number;

  @ManyToOne(() => Student, student => student.teams)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Team, team => team.members)
  @JoinColumn({ name: 'team_id' })
  team: Team;
}
