import { InMemoryQuestionRepository } from 'test/repositories/In-memory-question-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeQuestion } from 'test/factories/make-question';
import { EditQuestionUseCase } from './edit-question';
import { NotAllowedError } from './errors/not-allowed-error';

let inMemoryQuestionRepository:InMemoryQuestionRepository;
let sut:EditQuestionUseCase;
describe('Edit Question', () => {
	beforeEach(() => {
		inMemoryQuestionRepository=new InMemoryQuestionRepository();
		sut=new EditQuestionUseCase(inMemoryQuestionRepository);
	})

test('should be able to edit a question',async ()=>{

    const newQuestion=makeQuestion({
        authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('question-1'));

	await inMemoryQuestionRepository.create(newQuestion);

    await  sut.execute({
        questionId:newQuestion.id.toValue(),
        authorId:'author-1',
        title:'title of question',
        content: 'content of question'
    });


	expect(inMemoryQuestionRepository.item[0]).toMatchObject({
        title:'title of question',
        content: 'content of question'
    })

});

test('should not be able to edit a question from another user',async ()=>{

    const newQuestion=makeQuestion({
        authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('question-1'));

	await inMemoryQuestionRepository.create(newQuestion);

    const result=await sut.execute({
        questionId:newQuestion.id.toValue(),
        authorId:'author-2',
        title:'title of question',
        content: 'content of question'
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError)

});
})