import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerRepository } from '../repositories/answers-repository';
import { AnswerCommentRepository } from '../repositories/answer-comment-repository';


interface CommentOnAnswerRequest{
    authorId: string,
    answerId: string, 
    content: string,
}

interface CommentOnAnswerResponse{
    comment:AnswerComment;
}

export class CommentOnAnswerUseCase{
	constructor(private answerCommentRepository: AnswerCommentRepository,
                private answerRepository:AnswerRepository){}

	async execute({authorId,answerId,content}:CommentOnAnswerRequest):Promise<CommentOnAnswerResponse>
    {
        const answer=await this.answerRepository.findById(answerId);

        if(!answer) throw new Error('Could not find this answer');

        const comment=AnswerComment.Create({
            authorId:new UniqueEntityID(authorId),
            answerId:new UniqueEntityID(answerId),
            content,

        });

        await this.answerCommentRepository.create(comment);

        return {
            comment
        };
	}
}