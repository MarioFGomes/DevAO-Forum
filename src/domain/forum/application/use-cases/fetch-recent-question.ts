import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';


interface FetchRecentQuestionRequest{
    page:number;
}

interface FetchRecentQuestionResponse{
    questions:Question[];
}

export class FetchRecentQuestionUseCase{
	constructor(private questionRepository:QuestionRepository){}

	async execute({page}:FetchRecentQuestionRequest):Promise<FetchRecentQuestionResponse>
    {
        const questions=await this.questionRepository.fetchManyRecent({page});

        return {
            questions
        };
	}
}