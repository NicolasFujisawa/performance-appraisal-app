import { CreateTeamDto } from '@/dtos/create.team.dto';
import { Team } from '@/entity/team.entity';
import { HttpException } from '@exceptions/HttpException';
import { getRepository, Repository } from 'typeorm';
import { isEmpty } from '@utils/util';

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

  public async findTeamById(teamId: number): Promise<Team> {
    if (isEmpty(teamId)) throw new HttpException(400, 'Missing team ID');
    const teamRepository = getRepository(this.team);
    const findTeam: Team = await teamRepository.findOne({ where: { teamId: teamId }, relations: ['teacher', 'members', 'members.student'] });
    if (!findTeam) throw new HttpException(409, "You're not user");

    return findTeam;
  }

  public async findAll() {
    return this.teamRepository.find();
  }
}

export default TeamsService;
