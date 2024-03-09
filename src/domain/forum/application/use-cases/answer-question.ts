import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answers-repository';
import { promises } from 'dns';


interface AnswerQuestionRequest{
    instructorId: string;
    questionId: string;
    content: string;
}
interface AnswerQuestionResponse{
   answer: Answer
}

export class AnswerQuestionUseCase{
	constructor(private answerRepository:AnswerRepository){}

	async execute({instructorId,questionId,content}:AnswerQuestionRequest):Promise<AnswerQuestionResponse>
	{
		const answer=Answer.Create({
			content,
			authorId:new UniqueEntityID(instructorId),
			questionId:new UniqueEntityID(questionId),
		});

		await this.answerRepository.create(answer);

		return {answer};
	}
}