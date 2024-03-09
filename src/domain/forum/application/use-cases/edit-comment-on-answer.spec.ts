import { InMemoryCommentOnAnswerRepository } from 'test/repositories/In-memory-answer-comment-repository';
import { EditCommentOnAnswerUseCase } from './edit-comment-on-answer';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryCommentOnAnswerRepository:InMemoryCommentOnAnswerRepository;
let sut:EditCommentOnAnswerUseCase;
describe('Edit Comment on Answer', () => {
	beforeEach(() => {
		inMemoryCommentOnAnswerRepository=new InMemoryCommentOnAnswerRepository();
		sut=new EditCommentOnAnswerUseCase(inMemoryCommentOnAnswerRepository);
	})

test('should be able to edit a comment on answer',async ()=>{

    await inMemoryCommentOnAnswerRepository.create(makeAnswerComment({authorId:new UniqueEntityID('author-1')},new UniqueEntityID('answerComment-1')))
	const {answerComment}=await sut.execute({
		authorId:'author-1',
        answerCommentId:'answerComment-1',
		content:'Edit Content of Answer comment'
	});


	expect(answerComment.id).toBeTruthy();
	expect(inMemoryCommentOnAnswerRepository.item[0].content).toEqual('Edit Content of Answer comment')

});

test('should not be able to edit a comment on answer from another user',async ()=>{

    const answerComment=makeAnswerComment({
        authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('answer-1'));

	await inMemoryCommentOnAnswerRepository.create(answerComment);

    expect(()=>{
    return sut.execute({
        authorId:'1',
        answerCommentId:'answer-1',
		content:'Edit Content of Answer comment'
        });
    }).rejects.toBeInstanceOf(Error);


});
})