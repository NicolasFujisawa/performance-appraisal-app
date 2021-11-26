import { Student } from '@/entity/student.entity';
import { TeamMember } from '@/entity/teamMember.entity';
import { Score } from '@/entity/score.entity';
import { Evaluation } from '@/entity/evaluation.entity';
import { getRepository, Repository } from 'typeorm';

class StudentsService {
  public student = Student;
  private _studentRepository: Repository<Student>;

  public teamMember = TeamMember;
  private _teamMemberRepository: Repository<TeamMember>;

  public score = Score;
  private _scoreRepository: Repository<Score>;

  public evaluation = Evaluation;
  private _evaluationRepository: Repository<Evaluation>;

  get studentRepository() {
    if (this._studentRepository) return this._studentRepository;

    this._studentRepository = getRepository(this.student);
    return this._studentRepository;
  }

  get teamMemberRepository() {
    if (this._teamMemberRepository) return this._teamMemberRepository;

    this._teamMemberRepository = getRepository(this.teamMember);
    return this._teamMemberRepository;
  }

  get scoreRepository() {
    if (this._scoreRepository) return this._scoreRepository;

    this._scoreRepository = getRepository(this.score);
    return this._scoreRepository;
  }

  get evaluationRepository() {
    if (this._evaluationRepository) return this._evaluationRepository;

    this._evaluationRepository = getRepository(this.evaluation);
    return this._evaluationRepository;
  }

  private serialize(type: string, data: unknown, id: number, exclude?: string[]) {
    return [
      `[${type}:${id}]`,
      Object.entries(data)
        .filter(([key]) => !exclude?.includes(key))
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n'),
    ].join('\n');
  }

  public async dataByUser(userId: number) {
    const data = [];

    const student = await this.studentRepository.findOne(userId, { relations: ['teams', 'teams.team'] });
    data.push(this.serialize('student', student, student.studentId, ['teams']));

    data.push(...student.teams.map(teamMember => this.serialize('team', teamMember.team, teamMember.team.teamId)));

    const scoresEvaluationsReceived = await this.scoreRepository.find({
      where: { evaluatedStudent: student },
      relations: ['criteriaScore', 'criteriaScore.criteria', 'evaluation'],
    });

    const groupedScoresEvaluationsReceived: Record<number, Score[]> = scoresEvaluationsReceived.reduce(
      (accumulator, item) => ({
        ...accumulator,
        [item.evaluation.evaluationId]: [...(accumulator[item.evaluation.evaluationId] || []), item],
      }),
      {},
    );

    Object.entries(groupedScoresEvaluationsReceived).forEach(([evaluationId, scoresEvaluations]) => {
      data.push(`[evaluationReceived:${evaluationId}]`);
      data.push(`name: ${scoresEvaluations[0].evaluation.name}`);
      scoresEvaluations.forEach(scoreEvaluation => {
        data.push(`${scoreEvaluation.criteriaScore.criteria.name}: ${scoreEvaluation.criteriaScore.value}`);
      });
    });

    return data.join('\n');
  }
}

export default StudentsService;
