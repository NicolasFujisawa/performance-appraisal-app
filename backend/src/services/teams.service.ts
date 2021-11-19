import { CreateTeamDto } from '@/dtos/create.team.dto';
import { JoinTeamDto } from '@/dtos/join.team.dto';
import { Student } from '@/entity/student.entity';
import { Team } from '@/entity/team.entity';
import { TeamMember } from '@/entity/teamMember.entity';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
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

  public async joinTeam({ studentId, teamId }: JoinTeamDto) {
    const studentRepository = getRepository(Student);
    const teamMemberRepository = getRepository(TeamMember);

    const student = await studentRepository.findOneOrFail(studentId);
    const team = await this.teamRepository.findOneOrFail(teamId);

    await teamMemberRepository.save({ student, team });
  }
}

export default TeamsService;
