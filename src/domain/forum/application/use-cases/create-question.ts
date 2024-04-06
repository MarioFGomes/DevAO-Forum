import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';
import { Either, right } from '@/core/either';
import { QuestionAttachment } from '../../enterprise/entities/question-attachment';
import { QuestionAttachmentList } from '../../enterprise/question-attachment-list';


interface CreateQuestionRequest{
    authorId: string,
    title: string,
    attachmentIds: string[], 
    content: string,
}

type CreateQuestionResponse=Either<null,{
    question:Question;
}>

export class CreateQuestionUseCase{
	constructor(private questionRepository:QuestionRepository){}

	async execute({authorId,title,content,attachmentIds}:CreateQuestionRequest):Promise<CreateQuestionResponse>
    {
        const question=Question.Create({
            authorId:new UniqueEntityID(authorId),
            content,
            title
        });

       const questionAttachment=attachmentIds.map((attachmentId) =>{
            return QuestionAttachment.create({
                attachmentId: new UniqueEntityID(attachmentId),
                questionId: question.id,
            })
        });

        question.attachments=new QuestionAttachmentList(questionAttachment);
        

        await this.questionRepository.create(question);

        return right({
            question
        });
	}
}