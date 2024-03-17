import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answers-repository';
import {Either, right} from '@/core/either';


interface AnswerQuestionRequest{
    instructorId: string;
    questionId: string;
    content: string;
}
type  AnswerQuestionResponse=Either<null,
{
	answer: Answer
}>

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

		return right({answer});
	}
}