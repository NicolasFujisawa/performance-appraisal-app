import { CreateEvaluationDto } from '@/dtos/create.evaluation.dto';
import { TeamMember } from '@/entity/teamMember.entity';
import { Evaluation } from '@entity/evaluation.entity';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { getRepository, Repository } from 'typeorm';

class EvaluationService {
  public evaluation = Evaluation;
  private _evaluationRepository: Repository<Evaluation>;

  get evaluationRepository() {
    if (this._evaluationRepository) return this._evaluationRepository;

    this._evaluationRepository = getRepository(this.evaluation);
    return this._evaluationRepository;
  }

  public async findByTeam(team: number, fillRelations: boolean = false): Promise<Evaluation[]> {
    const relations = fillRelations
      ? ['method', 'method.criterias', 'method.criterias.criteriaScores', 'team', 'team.members', 'team.members.student', 'team.teacher']
      : [];
    const evaluations: Evaluation[] = await this.evaluationRepository.find({ where: { team }, relations });
    return evaluations;
  }

  public async findById(evaluationId: number, fillRelations: boolean = false): Promise<Evaluation> {
    if (isEmpty(evaluationId)) throw new HttpException(400, 'Empty id');

    const relations = fillRelations
      ? ['method', 'method.criterias', 'method.criterias.criteriaScores', 'team', 'team.members', 'team.members.student', 'team.teacher']
      : [];

    const evaluation: Evaluation = await this.evaluationRepository.findOne({ where: { evaluationId }, relations });
    if (!evaluation) throw new HttpException(404, 'Evaluation not found');

    return evaluation;
  }

  public async create(payload: CreateEvaluationDto): Promise<Evaluation> {
    if (isEmpty(payload)) throw new HttpException(400, 'Empty payload');

    const createEvaluation: Evaluation = await this.evaluationRepository.save({ ...payload });

    return createEvaluation;
  }

  public async findNotEvaluatedStudents({ studentId, evaluationId, role = 'student' }) {
    type queryResult = { teamMemberId: number; studentId: number; name: string };

    const result: queryResult[] = await getRepository(Evaluation).query(`
    select
      tm.student_id as "studentId",
      st.name
    from team_member tm
    inner join
      evaluation ev on ev."teamTeamId" = tm.team_id
    inner join
      student st on st.student_id = tm.student_id
    where
        ev.evaluation_id = ${evaluationId} and
        tm.student_id not in (
          select
            distinct evaluated_student_id
          from score
          where
            evaluation_id = ${evaluationId} and
            ${role === 'student' ? 'evaluator_student_id' : 'evaluator_teacher_id'} = ${studentId}
        )`);

    const teamMembers: TeamMember[] = result.map(row => ({ student: { studentId: row.studentId, name: row.name } } as TeamMember));
    return teamMembers;
  }
}

export default EvaluationService;
