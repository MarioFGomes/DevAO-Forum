import { QuestionCommentRepository } from '../repositories/question-comment-repository';


interface DeleteCommentOnQuestionRequest{
    authorId: string,
    questionCommentId: string, 
}

interface DeleteCommentOnQuestionResponse{}

export class DeleteCommentOnQuestionUseCase{

	constructor(private questionCommentRepository: QuestionCommentRepository){}

	async execute({authorId,questionCommentId}:DeleteCommentOnQuestionRequest):Promise<DeleteCommentOnQuestionResponse>
    {
        const questionComment= await this.questionCommentRepository.findById(questionCommentId);

        if(!questionComment) throw new Error('comment not found');

        if(authorId!==questionComment.authorId.toString()) throw new Error('Not authorized')

        await this.questionCommentRepository.delete(questionComment);

        return {};
	}
}