import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { FetchQuestionCommentUseCase } from './fetch-comment-on-question';
import { InMemoryCommentOnQuestionRepository } from 'test/repositories/In-memory-question-comment-repository';
import { makeQuestionComment } from 'test/factories/make-question-comment';


let inMemoryCommentOnQuestionRepository:InMemoryCommentOnQuestionRepository;
let sut:FetchQuestionCommentUseCase;
describe('Fetch Comment on  Question', () => {
	beforeEach(() => {
		inMemoryCommentOnQuestionRepository=new InMemoryCommentOnQuestionRepository();
		sut=new FetchQuestionCommentUseCase(inMemoryCommentOnQuestionRepository);
	})

test('should be able to fetch comment on question',async ()=>{

	await inMemoryCommentOnQuestionRepository.create(makeQuestionComment({questionId:new UniqueEntityID('question-1') }));
    await inMemoryCommentOnQuestionRepository.create(makeQuestionComment({questionId:new UniqueEntityID('question-1') }));
    await inMemoryCommentOnQuestionRepository.create(makeQuestionComment({questionId:new UniqueEntityID('question-1') }));

    const {questionComments} = await sut.execute({questionId:'question-1',page:1});


	expect(questionComments).toHaveLength(3);

});


test('should be able to fetch paginated comment on  question',async ()=>{

	for(let i=1; i<=22; i++){
        await inMemoryCommentOnQuestionRepository.create(makeQuestionComment(({questionId:new UniqueEntityID('question-1') })));
    }

    const {questionComments} = await sut.execute({questionId:'question-1',page:2});


	expect(questionComments).toHaveLength(2);

});

})