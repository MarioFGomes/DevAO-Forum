import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answers-repository';

interface EditAnswerRequest{
    answerId:string,
    authorId:string,
    content:string
}

interface EditAnswerResponse{
    answer:Answer
}

export class EditAnswerUseCase{
	constructor(private answerRepository:AnswerRepository){}

	async execute({answerId,authorId,content}:EditAnswerRequest):Promise<EditAnswerResponse>
    {
    const answer=await this.answerRepository.findById(answerId);

    if(!answer) throw new Error('Answer not exist');
    
    if(authorId!== answer.authorId.toString()) throw new Error('Not authorized');

    answer.content =content;

    await this.answerRepository.save(answer);

        return {answer};
	}
}