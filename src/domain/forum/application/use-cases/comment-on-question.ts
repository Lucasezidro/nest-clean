import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionRepository } from '../repositories/question-repository'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found'
import { Injectable } from '@nestjs/common'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

@Injectable()
export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.questionCommentsRepository.create(questionComment)

    return right({ questionComment })
  }
}
