import { AnswerRepository } from '../repositories/answers-repository';
import { QuestionRepository } from '../repositories/question-repository';
import { Question } from '../../enterprise/entities/question';
import { Either, left, right } from '@/core/either';
import { UseCaseErrors } from '@/core/errors/use-case-error';
import { ResourceNotFound } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';

interface ChooseBestAnswerQuestionRequest{
    answerId: string;
    authorId: string;
}

type ChooseBestAnswerQuestionResponse=Either<UseCaseErrors,{
    question: Question
}>

export class ChooseBestAnswerQuestionUseCase{
	constructor(
        private questionRepository:QuestionRepository,
        private answerRepository:AnswerRepository
        ){}

	async execute({answerId,authorId}:ChooseBestAnswerQuestionRequest):Promise<ChooseBestAnswerQuestionResponse>
	{
		const answer = await this.answerRepository.findById(answerId);

        if(!answer) return left(new ResourceNotFound());

        const question=await this.questionRepository.findById(answer.questionId.toString());

        if(!question) return left(new ResourceNotFound());

        if(authorId!==question.authorId.toString()) return left(new NotAllowedError());

        question.bestAnswerId=answer.id;

		await this.questionRepository.save(question);

		return right({question});
	}
}