import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-question'
import { makeAnswer } from 'test/factiories/make-answer'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factiories/make-question'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answers-attachments-repository'

let inMemoryAQuestionRepository: InMemoryQuestionsRepository
let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionAttachmentRepository
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose question best answer', () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentsRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryAQuestionRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachmentsRepository,
    )

    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentRepository,
    )

    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAQuestionRepository,
    )
  })

  it('should be able to choose the question best answer', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryAQuestionRepository.create(question)
    await inMemoryAQuestionRepository.create(question)

    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(inMemoryAQuestionRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should be not able to choose another user best answer', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })

    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryAQuestionRepository.create(question)
    await inMemoryAQuestionRepository.create(question)

    await inMemoryAnswerRepository.create(answer)

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
