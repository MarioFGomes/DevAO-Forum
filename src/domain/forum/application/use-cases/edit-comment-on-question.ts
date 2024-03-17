import { Either, left, right } from '@/core/either';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentRepository } from '../repositories/question-comment-repository';
import { UseCaseErrors } from '@/core/errors/use-case-error';
import { ResourceNotFound } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';


interface EditCommentOnQuestionRequest{
    authorId: string,
    questionCommentId: string, 
    content: string,
}

type EditCommentOnQuestionResponse=Either<UseCaseErrors,{
    questionComment:QuestionComment;
}>

export class EditCommentOnQuestionUseCase{

	constructor(private questionCommentRepository: QuestionCommentRepository){}

	async execute({authorId,questionCommentId,content}:EditCommentOnQuestionRequest):Promise<EditCommentOnQuestionResponse>
    {
        const questionComment= await this.questionCommentRepository.findById(questionCommentId);

        if(!questionComment) return left(new ResourceNotFound());

        if(authorId!==questionComment.authorId.toString()) return left(new NotAllowedError())

        questionComment.content = content;

        await this.questionCommentRepository.save(questionComment);

        return right({
            questionComment
        });
	}
}