import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { AttachmentPresenter } from './attachment-presenter'

export class QuestionDetailsPresenter {
  static toHTTP(details: QuestionDetails) {
    return {
      questionId: details.questionId.toString(),
      authorId: details.authorId,
      author: details.author,
      title: details.title,
      content: details.content,
      slug: details.slug.value,
      attachemnts: details.attatchments.map(AttachmentPresenter.toHTTP),
      bestAnswerId: details.bestAnswerId?.toString(),
      createdAt: details.createdAt,
      updatedAt: details.updatedAt,
    }
  }
}
