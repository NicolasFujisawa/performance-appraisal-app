import { CreateMethodDto } from '@/dtos/create.method.dto';
import { Method } from '@/entity/method.entity';
import { getRepository, Repository } from 'typeorm';

class MethodsService {
  public method = Method;
  private _methodRepository: Repository<Method>;

  get methodRepository() {
    if (this._methodRepository) return this._methodRepository;

    this._methodRepository = getRepository(this.method);
    return this._methodRepository;
  }

  public async create(payload: CreateMethodDto) {
    return this.methodRepository.save({ ...payload });
  }

  public async findAll() {
    return this.methodRepository.find();
  }
}

export default MethodsService;
