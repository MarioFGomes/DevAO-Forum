import { Either, right } from '@/core/either';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentRepository } from '../repositories/answer-comment-repository';

interface FetchAnswerCommentRequest{
    answerId:string
    page:number;
}

type FetchAnswerCommentResponse=Either<null,{
    answerComments:AnswerComment[];
}>

export class FetchAnswerCommentUseCase{
	constructor(private answerCommentRepository:AnswerCommentRepository){}

	async execute({answerId,page}:FetchAnswerCommentRequest):Promise<FetchAnswerCommentResponse>
    {
        const answerComments=await this.answerCommentRepository.findManyAnswerComment(answerId,{page});

        return right({
            answerComments
        });
	}
}