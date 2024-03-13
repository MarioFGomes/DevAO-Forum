import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentRepository } from '../repositories/answer-comment-repository';

interface FetchAnswerCommentRequest{
    answerId:string
    page:number;
}

interface FetchAnswerCommentResponse{
    answerComments:AnswerComment[];
}

export class FetchAnswerCommentUseCase{
	constructor(private answerCommentRepository:AnswerCommentRepository){}

	async execute({answerId,page}:FetchAnswerCommentRequest):Promise<FetchAnswerCommentResponse>
    {
        const answerComments=await this.answerCommentRepository.findManyAnswerComment(answerId,{page});

        return {
            answerComments
        };
	}
}