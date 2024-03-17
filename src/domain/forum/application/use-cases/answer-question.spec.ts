import { InMemoryAnswerRepository } from 'test/repositories/In-memory-answer-question-repository';
import { AnswerQuestionUseCase } from './answer-question';

let inMemoryAnswerRepository:InMemoryAnswerRepository;
let sut:AnswerQuestionUseCase;
 describe('Create Answer', () => {
	beforeEach(() => {
		inMemoryAnswerRepository=new InMemoryAnswerRepository();
		sut=new AnswerQuestionUseCase(inMemoryAnswerRepository);
	})

test('should be able to create a new  answer',async ()=>{

	const result=await sut.execute({
		instructorId: '1',
		questionId: '1',
		content:'Content of answer'
	});


	expect(result.isRight()).toBe(true);
	expect(inMemoryAnswerRepository.item[0]).toEqual(result.value?.answer)

});
})