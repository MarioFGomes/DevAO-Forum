import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { EditAnswerUseCase } from './edit-answer';
import { InMemoryAnswerRepository } from 'test/repositories/In-memory-answer-question-repository';

let inMemoryAnswerRepository:InMemoryAnswerRepository;
let sut:EditAnswerUseCase;
describe('Edit Answer', () => {
	beforeEach(() => {
		inMemoryAnswerRepository=new InMemoryAnswerRepository();
		sut=new EditAnswerUseCase(inMemoryAnswerRepository);
	})

test('should be able to edit a answer',async ()=>{

    const newAnswer=makeAnswer({
        authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('answer-1'));

	await inMemoryAnswerRepository.create(newAnswer);

    await  sut.execute({
        answerId:newAnswer.id.toValue(),
        authorId:'author-1',
        content: 'content of answer'
    });


	expect(inMemoryAnswerRepository.item[0]).toMatchObject({
        content: 'content of answer'
    })

});

test('should not be able to edit a answer from another user',async ()=>{

    const newAnswer=makeAnswer({
        authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('answer-1'));

	await inMemoryAnswerRepository.create(newAnswer);

    expect(()=>{
    return sut.execute({
        answerId:newAnswer.id.toValue(),
        authorId:'author-2',
        content: 'content of answer'
        });
    }).rejects.toBeInstanceOf(Error);


});
})