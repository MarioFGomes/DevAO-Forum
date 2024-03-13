import { InMemoryCommentOnAnswerRepository } from 'test/repositories/In-memory-answer-comment-repository';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DeleteCommentOnAnswerUseCase } from './delete-comment-on-answer';
import { NotAllowedError } from './errors/not-allowed-error';

let inMemoryCommentOnAnswerRepository:InMemoryCommentOnAnswerRepository;
let sut:DeleteCommentOnAnswerUseCase;
describe('Delete Comment on Answer', () => {
	beforeEach(() => {
		inMemoryCommentOnAnswerRepository=new InMemoryCommentOnAnswerRepository();
		sut=new DeleteCommentOnAnswerUseCase(inMemoryCommentOnAnswerRepository);
	})

test('should be able to edit a comment on answer',async ()=>{

    await inMemoryCommentOnAnswerRepository.create(makeAnswerComment({authorId:new UniqueEntityID('author-1')},new UniqueEntityID('answerComment-1')))
	
        await  sut.execute({
            authorId:'author-1',
            answerCommentId:'answerComment-1',
        
    });

	expect(inMemoryCommentOnAnswerRepository.item).toHaveLength(0);

});

test('should not be able to delete a comment on answer from another user',async ()=>{

    const answerComment=makeAnswerComment({
        authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('answer-1'));

	await inMemoryCommentOnAnswerRepository.create(answerComment);
    
    const result= await sut.execute({
        authorId:'1',
        answerCommentId:'answer-1',
        });
        expect(result.isLeft()).toBe(true);
        expect(result.value).instanceOf(NotAllowedError)
});
})