import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionRepository } from '../repositories/question-repository';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentRepository } from '../repositories/question-comment-repository';


interface CommentOnQuestionRequest{
    authorId: string,
    questionId: string, 
    content: string,
}

interface CommentOnQuestionResponse{
    comment:QuestionComment;
}

export class CommentOnQuestionUseCase{
	constructor(private questionCommentRepository: QuestionCommentRepository,
                private questionRepository:QuestionRepository){}

	async execute({authorId,questionId,content}:CommentOnQuestionRequest):Promise<CommentOnQuestionResponse>
    {
        const question=await this.questionRepository.findById(questionId);

        if(!question) throw new Error('Could not find this question');

        const comment=QuestionComment.Create({
            authorId:new UniqueEntityID(authorId),
            questionId:new UniqueEntityID(questionId),
            content,

        });

        await this.questionCommentRepository.create(comment);

        return {
            comment
        };
	}
}