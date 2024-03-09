import { AnswerCommentRepository } from '../repositories/answer-comment-repository';


interface DeleteCommentOnAnswerRequest{
    authorId: string,
    answerCommentId: string, 
}

interface DeleteCommentOnAnswerResponse{}

export class DeleteCommentOnAnswerUseCase{

	constructor(private answerCommentRepository: AnswerCommentRepository){}

	async execute({authorId,answerCommentId}:DeleteCommentOnAnswerRequest):Promise<DeleteCommentOnAnswerResponse>
    {
        const answerComment= await this.answerCommentRepository.findById(answerCommentId);

        if(!answerComment) throw new Error('comment not found');

        if(authorId!==answerComment.authorId.toString()) throw new Error('Not authorized')

        await this.answerCommentRepository.delete(answerComment);

        return {};
	}
}