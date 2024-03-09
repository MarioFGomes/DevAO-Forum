import { InMemoryQuestionRepository } from 'test/repositories/In-memory-question-repository';
import { makeQuestion } from 'test/factories/make-question';
import { FetchRecentQuestionUseCase } from './fetch-recent-question';

let inMemoryQuestionRepository:InMemoryQuestionRepository;
let sut:FetchRecentQuestionUseCase;
describe('Fetch Recent Question', () => {
	beforeEach(() => {
		inMemoryQuestionRepository=new InMemoryQuestionRepository();
		sut=new FetchRecentQuestionUseCase(inMemoryQuestionRepository);
	})

test('should be able to fetch many recent question',async ()=>{

	await inMemoryQuestionRepository.create(makeQuestion({createdAt: new Date('2024,0,20')}));
    await inMemoryQuestionRepository.create(makeQuestion({createdAt: new Date('2024,0,18')}));
    await inMemoryQuestionRepository.create(makeQuestion({createdAt: new Date('2024,0,24')}));

    const {questions} = await sut.execute({page:1});


	expect(questions).toEqual([
        expect.objectContaining({createdAt: new Date('2024,0,24')}),
        expect.objectContaining({createdAt: new Date('2024,0,20')}),
        expect.objectContaining({createdAt: new Date('2024,0,18')})
    ])

});


test('should be able to fetch paginated question',async ()=>{

	for(let i=1; i<=22; i++){
        await inMemoryQuestionRepository.create(makeQuestion());
    }

    const {questions} = await sut.execute({page:2});


	expect(questions).toHaveLength(2);

});

})