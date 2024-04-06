import { UseCaseErrors } from '@/core/errors/use-case-error';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';
import { Either, left, right } from '@/core/either';
import { ResourceNotFound } from '@/core/errors/errors/resource-not-found-error';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { QuestionAttachmentRepository } from '../repositories/question-attachment-repository';
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list';
import { QuestionAttachment } from '../../enterprise/entities/question-attachment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';


interface EditQuestionRequest{
    questionId:string,
    authorId:string,
    title:string,
    attachmentIds: string[],
    content:string
}

type EditQuestionResponse=Either<UseCaseErrors,{
    question:Question
}>

export class EditQuestionUseCase{
	constructor(private questionRepository:QuestionRepository,
    private questionAttachmentRepository:QuestionAttachmentRepository){}

	async execute({questionId,authorId,title,content,attachmentIds}:EditQuestionRequest):Promise<EditQuestionResponse>
    {
    const question=await this.questionRepository.findById(questionId);

    if(!question) return left(new ResourceNotFound());
    
    if(authorId!== question.authorId.toString()) return left(new NotAllowedError());

    const currentQuestionAttachment=await this.questionAttachmentRepository.fetchManyByQuestionId(questionId);

    const questionAttachmentList=new QuestionAttachmentList(currentQuestionAttachment);

    const questionAttachment=attachmentIds.map((attachmentId) =>{
        return QuestionAttachment.create({
            attachmentId: new UniqueEntityID(attachmentId),
            questionId: question.id,
        })
    });

    questionAttachmentList.update(questionAttachment);


    question.title=title;
    question.content=content;
    question.attachments=questionAttachmentList;

    await this.questionRepository.save(question);

        return right({question});
	}
}