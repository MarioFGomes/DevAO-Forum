import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentRepository } from '../repositories/answer-comment-repository';


interface EditCommentOnAnswerRequest{
    authorId: string,
    answerCommentId: string, 
    content: string,
}

interface EditCommentOnAnswerResponse{
    answerComment:AnswerComment;
}

export class EditCommentOnAnswerUseCase{

	constructor(private answerCommentRepository: AnswerCommentRepository){}

	async execute({authorId,answerCommentId,content}:EditCommentOnAnswerRequest):Promise<EditCommentOnAnswerResponse>
    {
        const answerComment= await this.answerCommentRepository.findById(answerCommentId);

        if(!answerComment) throw new Error('comment not found');

        if(authorId!==answerComment.authorId.toString()) throw new Error('Not authorized')

        answerComment.content = content;

        await this.answerCommentRepository.save(answerComment);

        return {
            answerComment
        };
	}
}