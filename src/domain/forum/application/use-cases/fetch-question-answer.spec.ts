import { InMemoryAnswerRepository } from 'test/repositories/In-memory-answer-question-repository';
import { FetchQuestionAnswerUseCase } from './fetch-question-answer';
import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryAnswerRepository:InMemoryAnswerRepository;
let sut:FetchQuestionAnswerUseCase;
describe('Fetch Answers Question', () => {
	beforeEach(() => {
		inMemoryAnswerRepository=new InMemoryAnswerRepository();
		sut=new FetchQuestionAnswerUseCase(inMemoryAnswerRepository);
	})

test('should be able to fetch answer question',async ()=>{

	await inMemoryAnswerRepository.create(makeAnswer({questionId:new UniqueEntityID('question-1') }));
    await inMemoryAnswerRepository.create(makeAnswer({questionId:new UniqueEntityID('question-1') }));
    await inMemoryAnswerRepository.create(makeAnswer({questionId:new UniqueEntityID('question-1') }));

    const result = await sut.execute({questionId:'question-1',page:1});


	expect(result.value?.answers).toHaveLength(3);

});


test('should be able to fetch paginated answer question',async ()=>{

	for(let i=1; i<=22; i++){
        await inMemoryAnswerRepository.create(makeAnswer(({questionId:new UniqueEntityID('question-1') })));
    }

    const result = await sut.execute({questionId:'question-1',page:2});


	expect(result.value?.answers).toHaveLength(2);

});

})