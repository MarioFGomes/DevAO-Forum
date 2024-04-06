import { SendNotificationUseCase } from './send-notification';
import { InMemoryNotificationRepository } from 'test/repositories/In-memory-notification-send-repository';

let inMemoryNotificationRepository:InMemoryNotificationRepository;
let sut:SendNotificationUseCase;
describe('Send Notification', () => {
	beforeEach(() => {
	
		inMemoryNotificationRepository=new InMemoryNotificationRepository();
		sut=new SendNotificationUseCase(inMemoryNotificationRepository);
	})

test('should be able to send a new  notification',async ()=>{

	const result=await sut.execute({
		recipientId:'1',
		title:'New Notification',
		content:'Content of Notification',
	});


	expect(result.isRight()).toBe(true);
	expect(inMemoryNotificationRepository.item[0]).toEqual(result.value?.notification)


});
})