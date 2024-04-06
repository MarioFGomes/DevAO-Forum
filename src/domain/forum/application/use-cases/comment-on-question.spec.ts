import { InMemoryCommentOnQuestionRepository } from 'test/repositories/In-memory-question-comment-repository';
import { InMemoryQuestionRepository } from 'test/repositories/In-memory-question-repository';
import { CommentOnQuestionUseCase } from './comment-on-question';
import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/In-memory-question-attachment-repository';

let inMemoryCommentOnQuestionRepository:InMemoryCommentOnQuestionRepository;
let inMemoryQuestionRepository:InMemoryQuestionRepository;
let inMemoryQuestionAttachment:InMemoryQuestionAttachmentRepository;
let sut:CommentOnQuestionUseCase;
 describe('Create Comment on Question', () => {
	beforeEach(() => {
		inMemoryQuestionAttachment=new InMemoryQuestionAttachmentRepository();
		inMemoryCommentOnQuestionRepository=new InMemoryCommentOnQuestionRepository();
        inMemoryQuestionRepository=new InMemoryQuestionRepository(inMemoryQuestionAttachment);
		sut=new CommentOnQuestionUseCase(inMemoryCommentOnQuestionRepository,inMemoryQuestionRepository);
	})

test('should be able to create a new comment on question',async ()=>{

    await inMemoryQuestionRepository.create(makeQuestion({},new UniqueEntityID('question-1')));

	const result=await sut.execute({
		authorId:'1',
        questionId:'question-1',
		content:'Content of Question comment'
	});


	expect(result.isRight()).toBe(true);
	expect(inMemoryCommentOnQuestionRepository.item[0].content).toEqual('Content of Question comment')

});
})