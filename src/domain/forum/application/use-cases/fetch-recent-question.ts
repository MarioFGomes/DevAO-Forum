import { Either, right } from '@/core/either';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';


interface FetchRecentQuestionRequest{
    page:number;
}

type FetchRecentQuestionResponse=Either<null,{
    questions:Question[];
}>

export class FetchRecentQuestionUseCase{
	constructor(private questionRepository:QuestionRepository){}

	async execute({page}:FetchRecentQuestionRequest):Promise<FetchRecentQuestionResponse>
    {
        const questions=await this.questionRepository.fetchManyRecent({page});

        return right({
            questions
        });
	}
}