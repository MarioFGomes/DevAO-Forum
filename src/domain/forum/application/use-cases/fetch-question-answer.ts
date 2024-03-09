import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answers-repository';

interface FetchQuestionAnswerRequest{
    questionId:string
    page:number;
}

interface FetchQuestionAnswerResponse{
    answers:Answer[];
}

export class FetchQuestionAnswerUseCase{
	constructor(private answerRepository:AnswerRepository){}

	async execute({questionId,page}:FetchQuestionAnswerRequest):Promise<FetchQuestionAnswerResponse>
    {
        const answers=await this.answerRepository.findManyQuestionId(questionId,{page});

        return {
            answers
        };
	}
}