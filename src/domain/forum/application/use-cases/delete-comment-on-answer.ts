import { Either, left, right } from '@/core/either';
import { AnswerCommentRepository } from '../repositories/answer-comment-repository';
import { ResourceNotFound } from '@/core/errors/errors/resource-not-found-error';
import { UseCaseErrors } from '@/core/errors/use-case-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

interface DeleteCommentOnAnswerRequest{
    authorId: string,
    answerCommentId: string, 
}

type DeleteCommentOnAnswerResponse=Either<UseCaseErrors,{}>

export class DeleteCommentOnAnswerUseCase{

	constructor(private answerCommentRepository: AnswerCommentRepository){}

	async execute({authorId,answerCommentId}:DeleteCommentOnAnswerRequest):Promise<DeleteCommentOnAnswerResponse>
    {
        const answerComment= await this.answerCommentRepository.findById(answerCommentId);

        if(!answerComment) return left(new ResourceNotFound());

        if(authorId!==answerComment.authorId.toString()) return left(new NotAllowedError());

        await this.answerCommentRepository.delete(answerComment);

        return right({});
	}
}