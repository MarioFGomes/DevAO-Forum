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

	const {answer}=await sut.execute({
		instructorId: '1',
		questionId: '1',
		content:'Content of answer'
	});


	expect(answer.id).toBeTruthy();
	expect(inMemoryAnswerRepository.item[0].id).toEqual(answer.id)

});
})