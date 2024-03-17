import { InMemoryQuestionRepository } from 'test/repositories/In-memory-question-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeQuestion } from 'test/factories/make-question';
import { DeleteQuestionUseCase } from './delete-question';
import { NotAllowedError } from './errors/not-allowed-error';

let inMemoryQuestionRepository:InMemoryQuestionRepository;
let sut:DeleteQuestionUseCase;
describe('Delete Question', () => {
	beforeEach(() => {
		inMemoryQuestionRepository=new InMemoryQuestionRepository();
		sut=new DeleteQuestionUseCase(inMemoryQuestionRepository);
	})

test('should be able to delete a question',async ()=>{

    const newQuestion=makeQuestion({
        authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('question-1'));

	await inMemoryQuestionRepository.create(newQuestion);

    await  sut.execute({
        questionId:'question-1',
        authorId:'author-1'
    });


	expect(inMemoryQuestionRepository.item).toHaveLength(0);

});

test('should not be able to delete a question from another user',async ()=>{

    const newQuestion=makeQuestion({
        authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('question-1'));

	await inMemoryQuestionRepository.create(newQuestion);

    const result= await sut.execute({
        questionId:'question-1',
        authorId:'author-2'
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError)


});
})