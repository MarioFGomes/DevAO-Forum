import { Either, left, right } from '@/core/either';
import { QuestionRepository } from '../repositories/question-repository';
import { UseCaseErrors } from '@/core/errors/use-case-error';
import { ResourceNotFound } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';


interface DeleteQuestionRequest{
    questionId:string,
    authorId:string
}

type DeleteQuestionResponse=Either<UseCaseErrors,{}>

export class DeleteQuestionUseCase{
	constructor(private questionRepository:QuestionRepository){}

	async execute({questionId,authorId}:DeleteQuestionRequest):Promise<DeleteQuestionResponse>
    {
    const question=await this.questionRepository.findById(questionId);

    if(!question) return left(new ResourceNotFound());
    
    if(authorId!== question.authorId.toString()) return left(new NotAllowedError());

    await this.questionRepository.delete(question);

        return right({});
	}
}