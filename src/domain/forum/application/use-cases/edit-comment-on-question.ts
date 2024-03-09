import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentRepository } from '../repositories/question-comment-repository';


interface EditCommentOnQuestionRequest{
    authorId: string,
    questionCommentId: string, 
    content: string,
}

interface EditCommentOnQuestionResponse{
    questionComment:QuestionComment;
}

export class EditCommentOnQuestionUseCase{

	constructor(private questionCommentRepository: QuestionCommentRepository){}

	async execute({authorId,questionCommentId,content}:EditCommentOnQuestionRequest):Promise<EditCommentOnQuestionResponse>
    {
        const questionComment= await this.questionCommentRepository.findById(questionCommentId);

        if(!questionComment) throw new Error('comment not found');

        if(authorId!==questionComment.authorId.toString()) throw new Error('Not authorized')

        questionComment.content = content;

        await this.questionCommentRepository.save(questionComment);

        return {
            questionComment
        };
	}
}