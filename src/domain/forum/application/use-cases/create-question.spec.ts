import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { CreateQuestionUseCase } from './create-question';
import { InMemoryQuestionRepository } from 'test/repositories/In-memory-question-repository';
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/In-memory-question-attachment-repository';

let inMemoryQuestionRepository:InMemoryQuestionRepository;
let inMemoryQuestionAttachment:InMemoryQuestionAttachmentRepository
let sut:CreateQuestionUseCase;
 describe('Create Question', () => {
	beforeEach(() => {
		inMemoryQuestionAttachment=new InMemoryQuestionAttachmentRepository();
		inMemoryQuestionRepository=new InMemoryQuestionRepository(inMemoryQuestionAttachment);
		sut=new CreateQuestionUseCase(inMemoryQuestionRepository);
	})

test('should be able to create a new  question',async ()=>{

	const result=await sut.execute({
		authorId:'1',
		title:'New Question',
		content:'Content of Question',
		attachmentIds:['1','2']
	});


	expect(result.isRight()).toBe(true);
	expect(inMemoryQuestionRepository.item[0].id).toEqual(result.value?.question.id)
	expect(inMemoryQuestionRepository.item[0].attachments.currentItems).toHaveLength(2)
	expect(inMemoryQuestionRepository.item[0].attachments.currentItems).toEqual([
		expect.objectContaining({attachmentId:new UniqueEntityID('1')}),
		expect.objectContaining({attachmentId:new UniqueEntityID('2')})
	])

});
})