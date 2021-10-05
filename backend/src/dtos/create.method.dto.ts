import { Criteria } from '@/entity/criteria.entity';
import { Teacher } from '@/entity/teacher.entity';

export interface CreateMethodDto {
  name: string;
  teacher: Teacher;
  criterias: Criteria[];
}
