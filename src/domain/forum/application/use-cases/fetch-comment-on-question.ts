import { Either, right } from '@/core/either';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentRepository } from '../repositories/question-comment-repository';

interface FetchQuestionCommentRequest{
    questionId:string
    page:number;
}

type FetchQuestionCommentResponse=Either<null,{
    questionComments:QuestionComment[];
}>

export class FetchQuestionCommentUseCase{
	constructor(private questionCommentRepository:QuestionCommentRepository){}

	async execute({questionId,page}:FetchQuestionCommentRequest):Promise<FetchQuestionCommentResponse>
    {
        const questionComments=await this.questionCommentRepository.findManyQuestionComment(questionId,{page});

        return right({
            questionComments
        });
	}
}