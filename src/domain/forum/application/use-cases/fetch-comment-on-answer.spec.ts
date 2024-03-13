import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { FetchAnswerCommentUseCase } from './fetch-comment-on-answer';
import { InMemoryCommentOnAnswerRepository } from 'test/repositories/In-memory-answer-comment-repository';
import { makeAnswerComment } from 'test/factories/make-answer-comment';


let inMemoryCommentOnAnswerRepository:InMemoryCommentOnAnswerRepository;
let sut:FetchAnswerCommentUseCase;
describe('Fetch Comment on  Answer', () => {
	beforeEach(() => {
		inMemoryCommentOnAnswerRepository=new InMemoryCommentOnAnswerRepository();
		sut=new FetchAnswerCommentUseCase(inMemoryCommentOnAnswerRepository);
	})

test('should be able to fetch comment on answer',async ()=>{

	await inMemoryCommentOnAnswerRepository.create(makeAnswerComment({answerId:new UniqueEntityID('answer-1') }));
    await inMemoryCommentOnAnswerRepository.create(makeAnswerComment({answerId:new UniqueEntityID('answer-1') }));
    await inMemoryCommentOnAnswerRepository.create(makeAnswerComment({answerId:new UniqueEntityID('answer-1') }));

    const {answerComments} = await sut.execute({answerId:'answer-1',page:1});


	expect(answerComments).toHaveLength(3);

});


test('should be able to fetch paginated comment on  answer',async ()=>{

	for(let i=1; i<=22; i++){
        await inMemoryCommentOnAnswerRepository.create(makeAnswerComment(({answerId:new UniqueEntityID('answer-1') })));
    }

    const {answerComments} = await sut.execute({answerId:'answer-1',page:2});


	expect(answerComments).toHaveLength(2);

});

})