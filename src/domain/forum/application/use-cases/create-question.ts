import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';
import { Either, right } from '@/core/either';


interface CreateQuestionRequest{
    authorId: string,
    title: string, 
    content: string,
}

type CreateQuestionResponse=Either<null,{
    question:Question;
}>

export class CreateQuestionUseCase{
	constructor(private questionRepository:QuestionRepository){}

	async execute({authorId,title,content}:CreateQuestionRequest):Promise<CreateQuestionResponse>
    {
        const question=Question.Create({
            authorId:new UniqueEntityID(authorId),
            content,
            title
        });

        await this.questionRepository.create(question);

        return right({
            question
        });
	}
}