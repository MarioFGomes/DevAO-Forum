import { InMemoryQuestionRepository } from 'test/repositories/In-memory-question-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeQuestion } from 'test/factories/make-question';
import { EditQuestionUseCase } from './edit-question';
import { NotAllowedError } from './errors/not-allowed-error';
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/In-memory-question-attachment-repository';
import { makeQuestionAttachment } from 'test/factories/make-question-attachment';

let inMemoryQuestionRepository:InMemoryQuestionRepository;
let inMemoryQuestionAttachment:InMemoryQuestionAttachmentRepository
let sut:EditQuestionUseCase;
describe('Edit Question', () => {
	beforeEach(() => {
        inMemoryQuestionAttachment=new InMemoryQuestionAttachmentRepository();
		inMemoryQuestionRepository=new InMemoryQuestionRepository(inMemoryQuestionAttachment);
		sut=new EditQuestionUseCase(inMemoryQuestionRepository,inMemoryQuestionAttachment);
	})

test('should be able to edit a question',async ()=>{

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
        questionId:newQuestion.id.toValue(),
        authorId:'author-1',
        title:'title of question',
        content: 'content of question',
        attachmentIds: ['1','3']
    });


	expect(inMemoryQuestionRepository.item[0]).toMatchObject({
        title:'title of question',
        content: 'content of question'
    })
    expect(inMemoryQuestionRepository.item[0].attachments.currentItems).toHaveLength(2)
	expect(inMemoryQuestionRepository.item[0].attachments.currentItems).toEqual([
		expect.objectContaining({attachmentId:new UniqueEntityID('1')}),
		expect.objectContaining({attachmentId:new UniqueEntityID('3')})
	])

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
        content: 'content of question',
        attachmentIds: ['1','3']
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError)

});
})