import { QuestionRepository } from '../repositories/question-repository';


interface DeleteQuestionRequest{
    questionId:string,
    authorId:string
}

interface DeleteQuestionResponse{}

export class DeleteQuestionUseCase{
	constructor(private questionRepository:QuestionRepository){}

	async execute({questionId,authorId}:DeleteQuestionRequest):Promise<DeleteQuestionResponse>
    {
    const question=await this.questionRepository.findById(questionId);

    if(!question) throw new Error('Question not exist');
    
    if(authorId!== question.authorId.toString()) throw new Error('Not authorized');

    await this.questionRepository.delete(question);

        return {};
	}
}