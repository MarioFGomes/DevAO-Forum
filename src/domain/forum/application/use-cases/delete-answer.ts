import { AnswerRepository } from "../repositories/answers-repository";

interface DeleteAnswerRequest{
    answerId:string,
    authorId:string
}

interface DeleteAnswerResponse{}

export class DeleteAnswerUseCase{
	constructor(private answerRepository:AnswerRepository){}

	async execute({answerId,authorId}:DeleteAnswerRequest):Promise<DeleteAnswerResponse>
    {
    const answer=await this.answerRepository.findById(answerId);

    if(!answer) throw new Error('Answer not exist');
    
    if(authorId!== answer.authorId.toString()) throw new Error('Not authorized');

    await this.answerRepository.delete(answer);

        return {};
	}
}