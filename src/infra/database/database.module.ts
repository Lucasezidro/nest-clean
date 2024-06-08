import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAnswerAttatchemtnsRepository } from './prisma/repositories/prisma-answer-attatcchments-repository'
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswerssRepository } from './prisma/repositories/prisma-answers-repository'
import { PrismaQuestionAttatchementsRepository } from './prisma/repositories/prisma-question-attatchements-repository'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository'
import { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnsewersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: AnswerAttachmentRepository,
      useClass: PrismaAnswerAttatchemtnsRepository,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: AnsewersRepository,
      useClass: PrismaAnswerssRepository,
    },
    {
      provide: QuestionAttachmentRepository,
      useClass: PrismaQuestionAttatchementsRepository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: QuestionRepository,
      useClass: PrismaQuestionsRepository,
    },
  ],
  exports: [
    PrismaService,
    AnswerAttachmentRepository,
    AnswerCommentsRepository,
    AnsewersRepository,
    QuestionAttachmentRepository,
    QuestionCommentsRepository,
    QuestionRepository,
    StudentsRepository,
  ],
})
export class DatabaseModule {}
