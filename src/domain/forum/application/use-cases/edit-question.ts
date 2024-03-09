import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';


interface EditQuestionRequest{
    questionId:string,
    authorId:string,
    title:string,
    content:string
}

interface EditQuestionResponse{
    question:Question
}

export class EditQuestionUseCase{
	constructor(private questionRepository:QuestionRepository){}

	async execute({questionId,authorId,title,content}:EditQuestionRequest):Promise<EditQuestionResponse>
    {
    const question=await this.questionRepository.findById(questionId);

    if(!question) throw new Error('Question not exist');
    
    if(authorId!== question.authorId.toString()) throw new Error('Not authorized');

    question.title =title;
    question.content =content;

    await this.questionRepository.save(question);

        return {question};
	}
}