export interface Team {
  teamId: number
  teacher: Teacher
  name: string
  members: TeamMember[]
}

export interface TeamMember {
  teamMemberId: number
  student: Student
}

export interface Student {
  studentId: number
  name: string
  ra: number
}

export interface Teacher {
  name: string
  teacherId: number
}
