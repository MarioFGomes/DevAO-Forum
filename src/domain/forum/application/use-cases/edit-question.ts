import { UseCaseErrors } from '@/core/errors/use-case-error';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';
import { Either, left, right } from '@/core/either';
import { ResourceNotFound } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';


interface EditQuestionRequest{
    questionId:string,
    authorId:string,
    title:string,
    content:string
}

type EditQuestionResponse=Either<UseCaseErrors,{
    question:Question
}>

export class EditQuestionUseCase{
	constructor(private questionRepository:QuestionRepository){}

	async execute({questionId,authorId,title,content}:EditQuestionRequest):Promise<EditQuestionResponse>
    {
    const question=await this.questionRepository.findById(questionId);

    if(!question) return left(new ResourceNotFound());
    
    if(authorId!== question.authorId.toString()) return left(new NotAllowedError());

    question.title =title;
    question.content =content;

    await this.questionRepository.save(question);

        return right({question});
	}
}