import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnsewersRepository } from '../repositories/answers-repository'

interface FetchQuestionsAnswersUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionsAnswersUseCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

export class FetchQuestionsAnswersUseCase {
  constructor(private answersRepository: AnsewersRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionsAnswersUseCaseRequest): Promise<FetchQuestionsAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return right({ answers })
  }
}
