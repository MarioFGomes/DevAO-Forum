import { Either, left, right } from '@/core/either';
import { UseCaseErrors } from '@/core/errors/use-case-error';
import { ResourceNotFound } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { NotificationRepository } from '../repositories/notification-repository';


interface ReadNotificationRequest{
    recipientId:string,
    notificationId:string
}

type ReadNotificationResponse=Either<UseCaseErrors,{}>

export class ReadNotificationUseCase{
	constructor(private notificationRepository:NotificationRepository){}

	async execute({recipientId,notificationId}:ReadNotificationRequest):Promise<ReadNotificationResponse>
    {
    const notification=await this.notificationRepository.findById(notificationId);

    if(!notification) return left(new ResourceNotFound());
    
    if(recipientId!== notification.recipientId.toString()) return left(new NotAllowedError());

    notification.read();

    await this.notificationRepository.save(notification);

        return right({});
	}
}