import { InMemoryQuestionRepository } from 'test/repositories/In-memory-question-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/In-memory-question-attachment-repository';

let inMemoryQuestionRepository:InMemoryQuestionRepository;
let inMemoryQuestionAttachment:InMemoryQuestionAttachmentRepository;
let sut:GetQuestionBySlugUseCase;
 describe('Get Question by Slug', () => {
	beforeEach(() => {
		inMemoryQuestionAttachment=new InMemoryQuestionAttachmentRepository();
		inMemoryQuestionRepository=new InMemoryQuestionRepository(inMemoryQuestionAttachment);
		sut=new GetQuestionBySlugUseCase(inMemoryQuestionRepository);
	})

test('should be able to create a new  question',async ()=>{

    const newQuestion=makeQuestion({
        slug:Slug.create('exempla-question')
    });


	await inMemoryQuestionRepository.create(newQuestion);

    const result = await sut.execute({
        slug:'exempla-question'
    });


	expect(result.isRight()).toBe(true);
	expect(result.value).toMatchObject({
		question:expect.objectContaining({
			title:newQuestion.title
		})
	})

});
})