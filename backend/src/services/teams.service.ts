import { CreateTeamDto } from '@/dtos/create.team.dto';
import { Team } from '@/entity/team.entity';
import { getRepository, Repository } from 'typeorm';

class TeamsService {
  public team = Team;
  private _teamRepository: Repository<Team>;

  get teamRepository() {
    if (this._teamRepository) return this._teamRepository;

    this._teamRepository = getRepository(this.team);
    return this._teamRepository;
  }

  public async create(payload: CreateTeamDto) {
    return this.teamRepository.save({ ...payload });
  }

  public async findAll() {
    return this.teamRepository.find();
  }
}

export default TeamsService;
