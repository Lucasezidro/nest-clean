import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface AttatchmentProps {
  title: string
  link: string
}

export class Attachment extends Entity<AttatchmentProps> {
  get title() {
    return this.props.title
  }

  get link() {
    return this.props.link
  }

  static create(props: AttatchmentProps, id?: UniqueEntityId) {
    const attachment = new Attachment(props, id)

    return attachment
  }
}
