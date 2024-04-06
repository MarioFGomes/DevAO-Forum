import { InMemoryCommentOnAnswerRepository } from 'test/repositories/In-memory-answer-comment-repository';
import { CommentOnAnswerUseCase } from './comment-on-answer';
import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryAnswerRepository } from 'test/repositories/In-memory-answer-question-repository';
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/In-memory-answer-attachment-repository';

let inMemoryCommentOnAnswerRepository:InMemoryCommentOnAnswerRepository;
let inMemoryAnswerRepository:InMemoryAnswerRepository;
let inMemoryAnswerAttachmentRepository:InMemoryAnswerAttachmentRepository
let sut:CommentOnAnswerUseCase;
 describe('Create Comment on Answer', () => {
	beforeEach(() => {
		inMemoryAnswerAttachmentRepository= new InMemoryAnswerAttachmentRepository()
		inMemoryCommentOnAnswerRepository=new InMemoryCommentOnAnswerRepository();
        inMemoryAnswerRepository=new InMemoryAnswerRepository(inMemoryAnswerAttachmentRepository);
		sut=new CommentOnAnswerUseCase(inMemoryCommentOnAnswerRepository,inMemoryAnswerRepository);
	})

test('should be able to create a new comment on answer',async ()=>{

    await inMemoryAnswerRepository.create(makeAnswer({},new UniqueEntityID('answer-1')));

	const result=await sut.execute({
		authorId:'1',
        answerId:'answer-1',
		content:'Content of Answer comment'
	});


	expect(result.isRight()).toBe(true);
	expect(inMemoryCommentOnAnswerRepository.item[0].content).toEqual('Content of Answer comment')

});
})