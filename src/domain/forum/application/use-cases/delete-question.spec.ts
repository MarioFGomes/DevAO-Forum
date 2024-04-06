import { InMemoryQuestionRepository } from 'test/repositories/In-memory-question-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeQuestion } from 'test/factories/make-question';
import { DeleteQuestionUseCase } from './delete-question';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/In-memory-question-attachment-repository';
import { makeQuestionAttachment } from 'test/factories/make-question-attachment';

let inMemoryQuestionRepository:InMemoryQuestionRepository;
let inMemoryQuestionAttachment:InMemoryQuestionAttachmentRepository
let sut:DeleteQuestionUseCase;
describe('Delete Question', () => {
	beforeEach(() => {
        inMemoryQuestionAttachment=new InMemoryQuestionAttachmentRepository();
		inMemoryQuestionRepository=new InMemoryQuestionRepository(inMemoryQuestionAttachment);
		sut=new DeleteQuestionUseCase(inMemoryQuestionRepository);
	})

test('should be able to delete a question',async ()=>{

    const newQuestion=makeQuestion({
        authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('question-1'));

	await inMemoryQuestionRepository.create(newQuestion);

    inMemoryQuestionAttachment.item.push(

        makeQuestionAttachment({
            questionId:newQuestion.id,
            attachmentId:new UniqueEntityID('1')
        }),

        makeQuestionAttachment({
            questionId:newQuestion.id,
            attachmentId:new UniqueEntityID('2')
        }),
    )

    await  sut.execute({
        questionId:'question-1',
        authorId:'author-1'
    });


	expect(inMemoryQuestionRepository.item).toHaveLength(0);
    expect(inMemoryQuestionAttachment.item).toHaveLength(0);
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