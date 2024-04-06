import { Either, left, right } from '@/core/either';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentRepository } from '../repositories/answer-comment-repository';
import { UseCaseErrors } from '@/core/errors/use-case-error';
import { ResourceNotFound } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';


interface EditCommentOnAnswerRequest{
    authorId: string,
    answerCommentId: string, 
    content: string,
}

type EditCommentOnAnswerResponse=Either<UseCaseErrors,{
    answerComment:AnswerComment;
}>

export class EditCommentOnAnswerUseCase{

	constructor(private answerCommentRepository: AnswerCommentRepository){}

	async execute({authorId,answerCommentId,content}:EditCommentOnAnswerRequest):Promise<EditCommentOnAnswerResponse>
    {
        const answerComment= await this.answerCommentRepository.findById(answerCommentId);

        if(!answerComment) return left(new ResourceNotFound());

        if(authorId!==answerComment.authorId.toString()) return left(new NotAllowedError());

        answerComment.content = content;

        await this.answerCommentRepository.save(answerComment);

        return right({
            answerComment
        });
	}
}