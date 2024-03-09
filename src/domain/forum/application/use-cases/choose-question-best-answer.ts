import { AnswerRepository } from '../repositories/answers-repository';
import { QuestionRepository } from '../repositories/question-repository';
import { Question } from '../../enterprise/entities/question';


interface ChooseBestAnswerQuestionRequest{
    answerId: string;
    authorId: string;
}
interface ChooseBestAnswerQuestionResponse{
    question: Question
}

export class ChooseBestAnswerQuestionUseCase{
	constructor(
        private questionRepository:QuestionRepository,
        private answerRepository:AnswerRepository
        ){}

	async execute({answerId,authorId}:ChooseBestAnswerQuestionRequest):Promise<ChooseBestAnswerQuestionResponse>
	{
		const answer = await this.answerRepository.findById(answerId);

        if(!answer) throw new Error('answer not found');

        const question=await this.questionRepository.findById(answer.questionId.toString());

        if(!question) throw new Error('question not found');

        if(authorId!==question.authorId.toString()) throw new Error('Not authorized')

        question.bestAnswerId=answer.id;

		await this.questionRepository.save(question);

		return {question};
	}
}