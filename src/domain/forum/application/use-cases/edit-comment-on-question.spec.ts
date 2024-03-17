import { InMemoryCommentOnQuestionRepository } from 'test/repositories/In-memory-question-comment-repository';
import { EditCommentOnQuestionUseCase } from './edit-comment-on-question';
import { makeQuestionComment } from 'test/factories/make-question-comment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from './errors/not-allowed-error';

let inMemoryCommentOnQuestionRepository:InMemoryCommentOnQuestionRepository;
let sut:EditCommentOnQuestionUseCase;
describe('Edit Comment on Question', () => {
	beforeEach(() => {
		inMemoryCommentOnQuestionRepository=new InMemoryCommentOnQuestionRepository();
		sut=new EditCommentOnQuestionUseCase(inMemoryCommentOnQuestionRepository);
	})

test('should be able to edit a comment on question',async ()=>{

    await inMemoryCommentOnQuestionRepository.create(makeQuestionComment({authorId:new UniqueEntityID('author-1')},new UniqueEntityID('questionComment-1')))
	const result=await sut.execute({
		authorId:'author-1',
        questionCommentId:'questionComment-1',
		content:'Edit Content of Question comment'
	});


	expect(result.isRight()).toBe(true);
	expect(inMemoryCommentOnQuestionRepository.item[0].content).toEqual('Edit Content of Question comment')

});

test('should not be able to edit a comment on question from another user',async ()=>{

    const questionComment=makeQuestionComment({
        authorId: new UniqueEntityID('author-1'),
    }, new UniqueEntityID('question-1'));

	await inMemoryCommentOnQuestionRepository.create(questionComment);

    const result=await sut.execute({
		authorId:'1',
		questionCommentId:'question-1',
		content:'Edit Content of Question comment'
	});

	expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError)


});
})