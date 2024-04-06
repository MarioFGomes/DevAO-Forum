import { Either, left, right } from '@/core/either';
import { QuestionCommentRepository } from '../repositories/question-comment-repository';
import { UseCaseErrors } from '@/core/errors/use-case-error';
import { ResourceNotFound } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';


interface DeleteCommentOnQuestionRequest{
    authorId: string,
    questionCommentId: string, 
}

type DeleteCommentOnQuestionResponse=Either<UseCaseErrors,{}>

export class DeleteCommentOnQuestionUseCase{

	constructor(private questionCommentRepository: QuestionCommentRepository){}

	async execute({authorId,questionCommentId}:DeleteCommentOnQuestionRequest):Promise<DeleteCommentOnQuestionResponse>
    {
        const questionComment= await this.questionCommentRepository.findById(questionCommentId);

        if(!questionComment) return left(new ResourceNotFound());

        if(authorId!==questionComment.authorId.toString()) return left(new NotAllowedError());

        await this.questionCommentRepository.delete(questionComment);

        return right({});
	}
}