import { Criteria } from '@/entity/criteria.entity';
import { getRepository, Repository } from 'typeorm';

class CriteriasService {
  public criteria = Criteria;
  private _criteriaRepository: Repository<Criteria>;

  get evaluationRepository() {
    if (this._criteriaRepository) return this._criteriaRepository;

    this._criteriaRepository = getRepository(this.criteria);
    return this._criteriaRepository;
  }

  public async findAll() {
    return this.evaluationRepository.find();
  }
}

export default CriteriasService;
