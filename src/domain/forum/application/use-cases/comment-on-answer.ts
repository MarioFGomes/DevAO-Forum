import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerRepository } from '../repositories/answers-repository';
import { AnswerCommentRepository } from '../repositories/answer-comment-repository';
import { Either, left, right } from '@/core/either';
import { UseCaseErrors } from '@/core/errors/use-case-error';
import { ResourceNotFound } from './errors/resource-not-found-error';


interface CommentOnAnswerRequest{
    authorId: string,
    answerId: string, 
    content: string,
}

type CommentOnAnswerResponse=Either<UseCaseErrors,{
    comment:AnswerComment;
}>

export class CommentOnAnswerUseCase{
	constructor(private answerCommentRepository: AnswerCommentRepository,
                private answerRepository:AnswerRepository){}

	async execute({authorId,answerId,content}:CommentOnAnswerRequest):Promise<CommentOnAnswerResponse>
    {
        const answer=await this.answerRepository.findById(answerId);

        if(!answer) return left(new ResourceNotFound());

        const comment=AnswerComment.Create({
            authorId:new UniqueEntityID(authorId),
            answerId:new UniqueEntityID(answerId),
            content,

        });

        await this.answerCommentRepository.create(comment);

        return right({
            comment
        });
	}
}