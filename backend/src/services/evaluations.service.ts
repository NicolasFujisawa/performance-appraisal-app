import { CreateEvaluationDto } from '@/dtos/create.evaluation.dto';
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

  public async findByTeam(team: number): Promise<Evaluation[]> {
    const evaluations: Evaluation[] = await this.evaluationRepository.find({ where: { team } });
    return evaluations;
  }

  public async findById(evaluationId: number, fillRelations: boolean = false): Promise<Evaluation> {
    if (isEmpty(evaluationId)) throw new HttpException(400, 'Empty id');

    const relations = fillRelations ? ['method', 'method.criterias', 'method.criterias.criteriaScores'] : [];

    const evaluation: Evaluation = await this.evaluationRepository.findOne({ where: { evaluationId }, relations });
    if (!evaluation) throw new HttpException(404, 'Evaluation not found');

    return evaluation;
  }

  public async create(payload: CreateEvaluationDto): Promise<Evaluation> {
    if (isEmpty(payload)) throw new HttpException(400, 'Empty payload');

    const createEvaluation: Evaluation = await this.evaluationRepository.save({ ...payload });

    return createEvaluation;
  }
}

export default EvaluationService;
