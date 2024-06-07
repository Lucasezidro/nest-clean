import { Student } from '../../enterprise/entities/student'

export abstract class StudentsRepository {
  abstract findByEmeial(email: string): Promise<Student | null>
  abstract create(student: Student): Promise<void>
}
