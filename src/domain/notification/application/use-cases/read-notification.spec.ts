import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ReadNotificationUseCase } from './read-notification';
import { InMemoryNotificationRepository } from 'test/repositories/In-memory-notification-send-repository';
import { makeNotification } from 'test/factories/make-notification';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

let inMemoryNotificationRepository:InMemoryNotificationRepository;
let sut:ReadNotificationUseCase;
describe('Read Notification', () => {
	beforeEach(() => {
	
		inMemoryNotificationRepository=new InMemoryNotificationRepository();
		sut=new ReadNotificationUseCase(inMemoryNotificationRepository);
	})

test('should be able to red a notification',async ()=>{

	const notification=makeNotification();

    await inMemoryNotificationRepository.create(notification)

	const result=await sut.execute({
		recipientId:notification.recipientId.toString(),
		notificationId:notification.id.toString(),
	});

	expect(result.isRight()).toBe(true);
	expect(inMemoryNotificationRepository.item[0].readAt).toEqual(expect.any(Date));


});

test('should not be able to read notification from another user',async ()=>{

    const notification=makeNotification({
        recipientId: new UniqueEntityID('recipientId-1'),
    });

	await inMemoryNotificationRepository.create(notification);

    const result= await sut.execute({
        notificationId:notification.id.toString(),
		recipientId:'recipientId-2'
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError)

});
})