import { Either, right } from '@/core/either';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answers-repository';

interface FetchQuestionAnswerRequest{
    questionId:string
    page:number;
}

type FetchQuestionAnswerResponse=Either<null,{
    answers:Answer[];
}>

export class FetchQuestionAnswerUseCase{
	constructor(private answerRepository:AnswerRepository){}

	async execute({questionId,page}:FetchQuestionAnswerRequest):Promise<FetchQuestionAnswerResponse>
    {
        const answers=await this.answerRepository.findManyQuestionId(questionId,{page});

        return right({
            answers
        });
	}
}