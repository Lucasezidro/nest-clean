import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { NotificationRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { PrismaNotificationsMapper } from '../mappers/prisma-notifications-mapper'
import { Notification } from '@/domain/notification/enterprise/entities/notifications'

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Notification | null> {
    const notifications = await this.prisma.notification.findUnique({
      where: {
        id,
      },
    })

    if (!notifications) {
      return null
    }

    return PrismaNotificationsMapper.toDomain(notifications)
  }

  async save(notifications: Notification): Promise<void> {
    const data = PrismaNotificationsMapper.toPrisma(notifications)

    await this.prisma.notification.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async create(notifications: Notification): Promise<void> {
    const data = PrismaNotificationsMapper.toPrisma(notifications)

    await this.prisma.notification.create({
      data,
    })
  }
}
