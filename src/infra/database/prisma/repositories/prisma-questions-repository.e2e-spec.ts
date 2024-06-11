import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository'
import { AppModule } from '@/infra/app.module'
import { CacheRepository } from '@/infra/cache/cache-repository'
import { CacheModule } from '@/infra/cache/cache.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AttachmentFactory } from 'test/factiories/make-attachment'
import { QuestionFactory } from 'test/factiories/make-question'
import { QuestionAttachmentFactory } from 'test/factiories/make-question-attachment'
import { StudentFactory } from 'test/factiories/make-student'

describe('Prisma questions repository (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let attachmentFactory: AttachmentFactory
  let questionAttachmentFactory: QuestionAttachmentFactory
  let cache: CacheRepository
  let questionsRepository: QuestionRepository
  let questionFactory: QuestionFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, CacheModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AttachmentFactory,
        QuestionAttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    questionsRepository = moduleRef.get(QuestionRepository)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    cache = moduleRef.get(CacheRepository)
    questionAttachmentFactory = moduleRef.get(QuestionAttachmentFactory)

    await app.init()
  })

  it('should cache details', async () => {
    const user = await studentFactory.makePrismaStudent()

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const attachemnt = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachemnt.id,
      questionId: question.id,
    })

    const slug = question.slug.value

    const questionDetails = await questionsRepository.findByDetailsBySlug(slug)

    const cached = await cache.get(`question:${slug}:details`)

    if (!cached) {
      throw new Error()
    }

    expect(JSON.parse(cached)).toEqual(
      expect.objectContaining({
        id: questionDetails?.questionId.toString(),
      }),
    )
  })

  it('should return cached question details on subsequent calls', async () => {
    const user = await studentFactory.makePrismaStudent()

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const attachemnt = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachemnt.id,
      questionId: question.id,
    })

    const slug = question.slug.value

    let cached = await cache.get(`question:${slug}:details`)

    expect(cached).toBeNull()

    await questionsRepository.findByDetailsBySlug(slug)

    cached = await cache.get(`question:${slug}:details`)

    expect(cached).not.toBeNull()

    const questionDetails = await questionsRepository.findByDetailsBySlug(slug)

    if (!cached) {
      throw new Error()
    }

    expect(JSON.parse(cached)).toEqual(
      expect.objectContaining({
        id: questionDetails?.questionId.toString(),
      }),
    )
  })

  it('should reset questions details cache when saving the question', async () => {
    const user = await studentFactory.makePrismaStudent()

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const attachemnt = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachemnt.id,
      questionId: question.id,
    })

    const slug = question.slug.value

    await cache.set(`question:${slug}:details`, JSON.stringify({ empty: true }))

    await questionsRepository.save(question)

    const cached = await cache.get(`question:${slug}:details`)

    expect(cached).toBeNull()
  })
})
