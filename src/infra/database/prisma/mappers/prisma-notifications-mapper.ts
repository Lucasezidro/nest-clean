import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Notification } from '@/domain/notification/enterprise/entities/notifications'
import { Prisma, Notification as PrismaNotifications } from '@prisma/client'

export class PrismaNotificationsMapper {
  static toDomain(raw: PrismaNotifications): Notification {
    return Notification.create(
      {
        title: raw.title,
        content: raw.content,
        recipientId: new UniqueEntityId(raw.recipientId),
        readAt: raw.readAt,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    notifications: Notification,
  ): Prisma.NotificationUncheckedCreateInput {
    return {
      id: notifications.id.toString(),
      recipientId: notifications.recipientId.toString(),
      title: notifications.title,
      content: notifications.content,
      createdAt: notifications.createdAt,
      readAt: notifications.readAt,
    }
  }
}
