import { UseCaseError } from '@/core/errors/use-case-errors'

export class InvalidAttachmentFileError extends Error implements UseCaseError {
  constructor(type: string) {
    super(`File type "${type}" is not valid.`)
  }
}
