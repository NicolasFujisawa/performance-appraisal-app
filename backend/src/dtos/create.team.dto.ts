import { Teacher } from '@/entity/teacher.entity';

export interface CreateTeamDto {
  name: string;
  teacher: Teacher;
}
