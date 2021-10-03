import { Method } from '@/entity/method.entity';
import { Team } from '@/entity/team.entity';

export class CreateEvaluationDto {
  name: string;
  start: string;
  end: string;
  isLastEvaluation: boolean;
  method: Method;
  team: Team;
}
