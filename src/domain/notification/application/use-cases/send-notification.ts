import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Either, right } from '@/core/either';
import { Notification } from '../../enterprise/entities/notification';
import { NotificationRepository } from '../repositories/notification-repository';


interface SendNotificationRequest{
    recipientId: string,
    title: string,
    content: string,
}

type SendNotificationResponse=Either<null,{
    notification:Notification;
}>

export class SendNotificationUseCase{
	constructor(private notificationRepository:NotificationRepository){}

	async execute({recipientId,title,content,}:SendNotificationRequest):Promise<SendNotificationResponse>
    {
        const notification=Notification.create({
            recipientId:new UniqueEntityID(recipientId),
            content,
            title
        });

        await this.notificationRepository.create(notification);

        return right({
            notification
        });
	}
}