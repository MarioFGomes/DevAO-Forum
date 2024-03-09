import { InMemoryCommentOnQuestionRepository } from 'test/repositories/In-memory-question-comment-repository';
import { InMemoryQuestionRepository } from 'test/repositories/In-memory-question-repository';
import { CommentOnQuestionUseCase } from './comment-on-question';
import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryCommentOnQuestionRepository:InMemoryCommentOnQuestionRepository;
let inMemoryQuestionRepository:InMemoryQuestionRepository;
let sut:CommentOnQuestionUseCase;
 describe('Create Comment on Question', () => {
	beforeEach(() => {
		inMemoryCommentOnQuestionRepository=new InMemoryCommentOnQuestionRepository();
        inMemoryQuestionRepository=new InMemoryQuestionRepository();
		sut=new CommentOnQuestionUseCase(inMemoryCommentOnQuestionRepository,inMemoryQuestionRepository);
	})

test('should be able to create a new comment on question',async ()=>{

    await inMemoryQuestionRepository.create(makeQuestion({},new UniqueEntityID('question-1')));

	const {comment}=await sut.execute({
		authorId:'1',
        questionId:'question-1',
		content:'Content of Question comment'
	});


	expect(comment.id).toBeTruthy();
	expect(inMemoryCommentOnQuestionRepository.item[0].content).toEqual('Content of Question comment')

});
})