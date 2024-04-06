import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { EditAnswerUseCase } from './edit-answer';
import { NotAllowedError } from './errors/not-allowed-error';
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/In-memory-answer-attachment-repository';
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment';
import { InMemoryAnswerRepository } from 'test/repositories/In-memory-answer-question-repository';

let inMemoryAnswerRepository:InMemoryAnswerRepository;
let inMemoryAnswerAttachment:InMemoryAnswerAttachmentRepository
let sut:EditAnswerUseCase;
describe('Edit Answer', () => {
	beforeEach(() => {
        inMemoryAnswerAttachment=new InMemoryAnswerAttachmentRepository()
		inMemoryAnswerRepository=new InMemoryAnswerRepository(inMemoryAnswerAttachment);
        
		sut=new EditAnswerUseCase(inMemoryAnswerRepository,inMemoryAnswerAttachment);
	})

test('should be able to edit a answer',async ()=>{

    const newAnswer=makeAnswer({
        authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('answer-1'));

	await inMemoryAnswerRepository.create(newAnswer);

    inMemoryAnswerAttachment.item.push(

        makeAnswerAttachment({
            answerId:newAnswer.id,
            attachmentId:new UniqueEntityID('1')
        }),

        makeAnswerAttachment({
            answerId:newAnswer.id,
            attachmentId:new UniqueEntityID('2')
        }),
    )

    await  sut.execute({
        answerId:newAnswer.id.toValue(),
        authorId:'author-1',
        content: 'content of answer',
        attachmentIds: ['1','3']
    });


	expect(inMemoryAnswerRepository.item[0]).toMatchObject({
        content: 'content of answer'
    })
    expect(inMemoryAnswerRepository.item[0].attachments.currentItems).toHaveLength(2)
	expect(inMemoryAnswerRepository.item[0].attachments.currentItems).toEqual([
		expect.objectContaining({attachmentId:new UniqueEntityID('1')}),
		expect.objectContaining({attachmentId:new UniqueEntityID('3')})
	])

});

test('should not be able to edit a answer from another user',async ()=>{

    const newAnswer=makeAnswer({
        authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('answer-1'));

	await inMemoryAnswerRepository.create(newAnswer);

    const result=await sut.execute({
        answerId:newAnswer.id.toValue(),
        authorId:'author-2',
        content: 'content of answer',
        attachmentIds:[]
        });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError)


});
})