import { CreateScoreDto } from '@/dtos/create.score.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Score } from '@entity/score.entity';
import { isEmpty } from 'class-validator';
import { getRepository, Repository } from 'typeorm';

class ScoreService {
  public score = Score;
  private _scoreRepository: Repository<Score>;

  get scoreRepository() {
    if (this._scoreRepository) return this._scoreRepository;

    this._scoreRepository = getRepository(this.score);
    return this._scoreRepository;
  }

  public findByEvaluationAndEvaluatedStudent = async (evaluationId: number, evaluatedStudentId: number): Promise<Score[]> => {
    if (isEmpty(evaluationId)) throw new HttpException(400, 'Empty id');

    const scores: Score[] = await this.scoreRepository.find({
      where: { evaluation: evaluationId, evaluatedStudent: evaluatedStudentId },
      relations: ['evaluatedStudent', 'evaluatorStudent', 'evaluatorTeacher', 'criteriaScore'],
    });

    return scores;
  };

  public createBulk = async (payload: CreateScoreDto[]): Promise<Score[]> => {
    const createdScores: Score[] = await Promise.all(payload.map(this.createOne));

    return createdScores;
  };

  private createOne = async (score: CreateScoreDto): Promise<Score> => {
    const createScore: Score = await this.scoreRepository.save({ ...score });
    return createScore;
  };
}

export default ScoreService;
