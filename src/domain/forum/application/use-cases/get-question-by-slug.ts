import { Either, left, right } from '@/core/either';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';
import { UseCaseErrors } from '@/core/errors/use-case-error';
import { ResourceNotFound } from './errors/resource-not-found-error';


interface GetQuestionBySlugRequest{
    slug:string;
}

type GetQuestionBySlugResponse=Either<UseCaseErrors,
{
    question:Question;
}>

export class GetQuestionBySlugUseCase{
	constructor(private questionRepository:QuestionRepository){}

	async execute({slug}:GetQuestionBySlugRequest):Promise<GetQuestionBySlugResponse>
    {
        const question=await this.questionRepository.findBySlug(slug);

        if(!question) return left(new ResourceNotFound());

        return right({
            question
        });
	}
}