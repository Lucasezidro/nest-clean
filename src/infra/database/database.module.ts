import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAnswerAttatchemtnsRepository } from './prisma/repositories/prisma-answer-attatcchments-repository'
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswerssRepository } from './prisma/repositories/prisma-answers-repository'
import { PrismaQuestionAttatchementsRepository } from './prisma/repositories/prisma-question-attatchements-repository'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'

@Module({
  providers: [
    PrismaService,
    PrismaAnswerAttatchemtnsRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerssRepository,
    PrismaQuestionAttatchementsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionsRepository,
  ],
  exports: [
    PrismaService,
    PrismaAnswerAttatchemtnsRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerssRepository,
    PrismaQuestionAttatchementsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionsRepository,
  ],
})
export class DatabaseModule {}
