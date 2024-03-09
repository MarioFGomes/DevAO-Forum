import { InMemoryQuestionRepository } from 'test/repositories/In-memory-question-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeQuestion } from 'test/factories/make-question';
import { ChooseBestAnswerQuestionUseCase } from './choose-question-best-answer';
import { InMemoryAnswerRepository } from 'test/repositories/In-memory-answer-question-repository';
import { makeAnswer } from 'test/factories/make-answer';
import { a } from 'vitest/dist/suite-UrZdHRff';

let inMemoryQuestionRepository:InMemoryQuestionRepository;
let inMemoryAnswerRepository:InMemoryAnswerRepository;
let sut:ChooseBestAnswerQuestionUseCase;
describe('Choose Question best answer', () => {
	beforeEach(() => {
		inMemoryQuestionRepository=new InMemoryQuestionRepository();
        inMemoryAnswerRepository=new InMemoryAnswerRepository();
		sut=new ChooseBestAnswerQuestionUseCase(inMemoryQuestionRepository,inMemoryAnswerRepository);
	})

test('should be able to choose the question best answer',async ()=>{

    const question=makeQuestion();
    const answer=makeAnswer({questionId: question.id});

	await inMemoryQuestionRepository.create(question);
    await inMemoryAnswerRepository.create(answer);

    await  sut.execute({
        answerId:answer.id.toString(),
        authorId:question.authorId.toString(),
    });

	expect(inMemoryQuestionRepository.item[0].bestAnswerId).toEqual(answer.id);

});

test('should not be able to choose another user  question best answer',async ()=>{

    const question=makeQuestion({authorId:new UniqueEntityID('author-1'), });
    const answer=makeAnswer({questionId: question.id});

	await inMemoryQuestionRepository.create(question);
    await inMemoryAnswerRepository.create(answer);

    await  sut.execute({
        answerId:answer.id.toString(),
        authorId:question.authorId.toString(),
    });

    expect(()=>{
    return sut.execute({
        answerId:answer.id.toString(),
        authorId:'author-2',
    });
    }).rejects.toBeInstanceOf(Error);


});
})