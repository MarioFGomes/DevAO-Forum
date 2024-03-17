import { CreateQuestionUseCase } from './create-question';
import { InMemoryQuestionRepository } from 'test/repositories/In-memory-question-repository';

let inMemoryQuestionRepository:InMemoryQuestionRepository;
let sut:CreateQuestionUseCase;
 describe('Create Question', () => {
	beforeEach(() => {
		inMemoryQuestionRepository=new InMemoryQuestionRepository();
		sut=new CreateQuestionUseCase(inMemoryQuestionRepository);
	})

test('should be able to create a new  question',async ()=>{

	const result=await sut.execute({
		authorId:'1',
		title:'New Question',
		content:'Content of Question'
	});


	expect(result.isRight()).toBe(true);
	expect(inMemoryQuestionRepository.item[0].id).toEqual(result.value?.question.id)

});
})