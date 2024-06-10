import { UploadAndCreateAttachmentUseCase } from './upload-and-create-attachment'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-upload-attachment'
import { FakeUploader } from 'test/storage/fake-uploader'
import { InvalidAttachmentFileError } from './errors/invalid-attachment-file-error'

let imMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let fakeUploader: FakeUploader
let sut: UploadAndCreateAttachmentUseCase

describe('Upload and Create Attachment', () => {
  beforeEach(() => {
    imMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    fakeUploader = new FakeUploader()

    sut = new UploadAndCreateAttachmentUseCase(
      imMemoryAttachmentsRepository,
      fakeUploader,
    )
  })

  it('should be able to upload and create an attachment', async () => {
    const result = await sut.execute({
      fileName: 'profile.png',
      fileType: 'image/png',
      body: Buffer.from(''),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      attachment: imMemoryAttachmentsRepository.items[0],
    })
    expect(fakeUploader.upload).toHaveLength(1)
  })

  it('should not be able to upload an attachment with invalid type', async () => {
    const result = await sut.execute({
      fileName: 'audio.mp3',
      fileType: 'mpeg',
      body: Buffer.from(''),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidAttachmentFileError)
  })
})
