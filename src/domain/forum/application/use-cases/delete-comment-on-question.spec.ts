import { InMemoryCommentOnQuestionRepository } from 'test/repositories/In-memory-question-comment-repository';
import { makeQuestionComment } from 'test/factories/make-question-comment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DeleteCommentOnQuestionUseCase } from './delete-comment-on-question';

let inMemoryCommentOnQuestionRepository:InMemoryCommentOnQuestionRepository;
let sut:DeleteCommentOnQuestionUseCase;
describe('Delete Comment on Question', () => {
	beforeEach(() => {
		inMemoryCommentOnQuestionRepository=new InMemoryCommentOnQuestionRepository();
		sut=new DeleteCommentOnQuestionUseCase(inMemoryCommentOnQuestionRepository);
	})

test('should be able to edit a comment on question',async ()=>{

    await inMemoryCommentOnQuestionRepository.create(makeQuestionComment({authorId:new UniqueEntityID('author-1')},new UniqueEntityID('questionComment-1')))
	
        await  sut.execute({
            authorId:'author-1',
            questionCommentId:'questionComment-1',
        
    });

	expect(inMemoryCommentOnQuestionRepository.item).toHaveLength(0);

});

test('should not be able to delete a comment on question from another user',async ()=>{

    const questionComment=makeQuestionComment({
        authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('question-1'));

	await inMemoryCommentOnQuestionRepository.create(questionComment);

    expect(()=>{
    return sut.execute({
        authorId:'1',
        questionCommentId:'question-1',
        });
    }).rejects.toBeInstanceOf(Error);
});
})