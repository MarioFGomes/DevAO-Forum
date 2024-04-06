import { InMemoryAnswerRepository } from 'test/repositories/In-memory-answer-question-repository';
import { AnswerQuestionUseCase } from './answer-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/In-memory-answer-attachment-repository';

let inMemoryAnswerRepository:InMemoryAnswerRepository;
let inMemoryAnswerAttachmentRepository:InMemoryAnswerAttachmentRepository
let sut:AnswerQuestionUseCase;
 describe('Create Answer', () => {
	beforeEach(() => {
		inMemoryAnswerAttachmentRepository=new InMemoryAnswerAttachmentRepository()
		inMemoryAnswerRepository=new InMemoryAnswerRepository(inMemoryAnswerAttachmentRepository);
		sut=new AnswerQuestionUseCase(inMemoryAnswerRepository);
	})

test('should be able to create a new  answer',async ()=>{

	const result=await sut.execute({
		instructorId: '1',
		questionId: '1',
		content:'Content of answer',
		attachmentIds: ['1','2']
	});


	expect(result.isRight()).toBe(true);
	expect(inMemoryAnswerRepository.item[0]).toEqual(result.value?.answer)
	expect(inMemoryAnswerRepository.item[0].attachments.currentItems).toHaveLength(2)
	expect(inMemoryAnswerRepository.item[0].attachments.currentItems).toEqual([
		expect.objectContaining({attachmentId:new UniqueEntityID('1')}),
		expect.objectContaining({attachmentId:new UniqueEntityID('2')})
	])

});
})