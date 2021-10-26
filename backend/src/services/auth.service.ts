import { UserLoginDto } from '@/dtos/user.login.dto';
import { Student } from '@/entity/student.entity';
import { Teacher } from '@/entity/teacher.entity';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { getRepository } from 'typeorm';

class AuthService {
  public students = Student;
  public teachers = Teacher;

  public async login(userData: UserLoginDto): Promise<{ userId: number; role: string }> {
    if (isEmpty(userData)) throw new HttpException(400, 'Dados invalidos');

    const { identifier } = userData;

    const studentRepository = getRepository(this.students);

    const studentFound = await studentRepository.findOne({ where: { ra: identifier } });

    if (studentFound) {
      return {
        userId: studentFound.studentId,
        role: 'student',
      };
    }

    const teacherRepository = getRepository(this.teachers);
    const teacherFound = await teacherRepository.findOne({ where: { teacherIdentifier: identifier } });

    if (teacherFound) {
      return {
        userId: teacherFound.teacherId,
        role: 'teacher',
      };
    }

    if (!teacherFound) throw new HttpException(409, 'Credenciais incorretas.');
  }
}

export default AuthService;
