import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { DeleteAnswerUseCase } from './delete-answer';
import { InMemoryAnswerRepository } from 'test/repositories/In-memory-answer-question-repository';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/In-memory-answer-attachment-repository';

let inMemoryAnswerRepository:InMemoryAnswerRepository;
let inMemoryAnswerAttachmentRepository:InMemoryAnswerAttachmentRepository
let sut:DeleteAnswerUseCase;
describe('Delete Answer', () => {
	beforeEach(() => {
        inMemoryAnswerAttachmentRepository=new InMemoryAnswerAttachmentRepository()
		inMemoryAnswerRepository=new InMemoryAnswerRepository(inMemoryAnswerAttachmentRepository);
		sut=new DeleteAnswerUseCase(inMemoryAnswerRepository);
	})

test('should be able to delete a answer',async ()=>{

    const newAnswer=makeAnswer({
        authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('answer-1'));

	await inMemoryAnswerRepository.create(newAnswer);

    await  sut.execute({
        answerId:'answer-1',
        authorId:'author-1'
    });


	expect(inMemoryAnswerRepository.item).toHaveLength(0);

});

test('should not be able to delete a answer from another user',async ()=>{

    const newAnswer=makeAnswer({
        authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('answer-1'));

	await inMemoryAnswerRepository.create(newAnswer);

    const result= await sut.execute({
        answerId:'answer-1',
        authorId:'author-2'
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError)

});
})