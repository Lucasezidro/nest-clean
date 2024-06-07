import { Notification } from '../../enterprise/entities/notifications'

export interface NotificationRepository {
  findById(id: string): Promise<Notification | null>
  save(notification: Notification): Promise<void>
  create(notification: Notification): Promise<void>
}
