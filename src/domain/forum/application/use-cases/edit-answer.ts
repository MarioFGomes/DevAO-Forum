import { Either, left, right } from '@/core/either';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answers-repository';
import { UseCaseErrors } from '@/core/errors/use-case-error';
import { ResourceNotFound } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';

interface EditAnswerRequest{
    answerId:string,
    authorId:string,
    content:string
}

type EditAnswerResponse=Either<UseCaseErrors,{
    answer:Answer
}>

export class EditAnswerUseCase{
	constructor(private answerRepository:AnswerRepository){}

	async execute({answerId,authorId,content}:EditAnswerRequest):Promise<EditAnswerResponse>
    {
    const answer=await this.answerRepository.findById(answerId);

    if(!answer) return left(new ResourceNotFound());
    
    if(authorId!== answer.authorId.toString()) return left(new NotAllowedError());

    answer.content =content;

    await this.answerRepository.save(answer);

        return right({answer});
	}
}