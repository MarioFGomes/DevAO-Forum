import { Either, left, right } from '@/core/either';
import { AnswerCommentRepository } from '../repositories/answer-comment-repository';


interface DeleteCommentOnAnswerRequest{
    authorId: string,
    answerCommentId: string, 
}

type DeleteCommentOnAnswerResponse=Either<string,{}>

export class DeleteCommentOnAnswerUseCase{

	constructor(private answerCommentRepository: AnswerCommentRepository){}

	async execute({authorId,answerCommentId}:DeleteCommentOnAnswerRequest):Promise<DeleteCommentOnAnswerResponse>
    {
        const answerComment= await this.answerCommentRepository.findById(answerCommentId);

        if(!answerComment) return left('comment not found');

        if(authorId!==answerComment.authorId.toString()) return left('Not authorized');

        await this.answerCommentRepository.delete(answerComment);

        return right({});
	}
}