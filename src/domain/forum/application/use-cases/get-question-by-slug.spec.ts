import { InMemoryQuestionRepository } from 'test/repositories/In-memory-question-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { makeQuestion } from 'test/factories/make-question';

let inMemoryQuestionRepository:InMemoryQuestionRepository;
let sut:GetQuestionBySlugUseCase;
 describe('Get Question by Slug', () => {
	beforeEach(() => {
		inMemoryQuestionRepository=new InMemoryQuestionRepository();
		sut=new GetQuestionBySlugUseCase(inMemoryQuestionRepository);
	})

test('should be able to create a new  question',async ()=>{

    const newQuestion=makeQuestion({
        slug:Slug.create('exempla-question')
    });


	await inMemoryQuestionRepository.create(newQuestion);

    const {question} = await sut.execute({
        slug:'exempla-question'
    });


	expect(question.id).toBeTruthy();
	expect(question.title).toEqual(newQuestion.title)

});
})