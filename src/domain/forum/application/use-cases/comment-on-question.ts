import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionRepository } from '../repositories/question-repository';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentRepository } from '../repositories/question-comment-repository';
import { Either, left, right } from '@/core/either';
import { ResourceNotFound } from '@/core/errors/errors/resource-not-found-error';
import { UseCaseErrors } from '@/core/errors/use-case-error';


interface CommentOnQuestionRequest{
    authorId: string,
    questionId: string, 
    content: string,
}

type CommentOnQuestionResponse=Either<UseCaseErrors,{
    comment:QuestionComment;
}>

export class CommentOnQuestionUseCase{
	constructor(private questionCommentRepository: QuestionCommentRepository,
                private questionRepository:QuestionRepository){}

	async execute({authorId,questionId,content}:CommentOnQuestionRequest):Promise<CommentOnQuestionResponse>
    {
        const question=await this.questionRepository.findById(questionId);

        if(!question) return left(new ResourceNotFound());

        const comment=QuestionComment.Create({
            authorId:new UniqueEntityID(authorId),
            questionId:new UniqueEntityID(questionId),
            content,

        });

        await this.questionCommentRepository.create(comment);

        return right({
            comment
        });
	}
}