import { NotificationRepository } from "@/domain/notification/application/repositories/notification-repository";
import { Notification } from "@/domain/notification/enterprise/entities/notification";

export class InMemoryNotificationRepository implements NotificationRepository {
    public item:Notification []=[];

    async create(notification: Notification) {
    this.item.push(notification);
    }

    async findById(notificationId: string){
        const notification= this.item.find(item => item.id.toString() === notificationId)
        if(!notification) return null;
        return notification
    }

    async save(notification: Notification) {
        const IndexId=this.item.findIndex((item) => item.id===notification.id);
        this.item[IndexId] = notification;
    }

}