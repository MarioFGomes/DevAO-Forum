import { Either, left, right } from '@/core/either';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answers-repository';
import { UseCaseErrors } from '@/core/errors/use-case-error';
import { ResourceNotFound } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';
import { AnswerAttachmentRepository } from '../repositories/answer-attachment-repository';
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list';
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface EditAnswerRequest{
    answerId:string,
    authorId:string,
    content:string,
    attachmentIds:string[]
}

type EditAnswerResponse=Either<UseCaseErrors,{
    answer:Answer
}>

export class EditAnswerUseCase{
	constructor(private answerRepository:AnswerRepository,
        private answerAttachmentRepository:AnswerAttachmentRepository
        ){}

	async execute({answerId,authorId,content,attachmentIds}:EditAnswerRequest):Promise<EditAnswerResponse>
    {
    const answer=await this.answerRepository.findById(answerId);

    if(!answer) return left(new ResourceNotFound());
    
    if(authorId!== answer.authorId.toString()) return left(new NotAllowedError());

    const currentAnswerAttachment=await this.answerAttachmentRepository.fetchManyByAnswerId(answerId);

    const answerAttachmentList=new AnswerAttachmentList(currentAnswerAttachment);

    const answerAttachment=attachmentIds.map((attachmentId) =>{
        return AnswerAttachment.create({
            attachmentId: new UniqueEntityID(attachmentId),
            answerId: answer.id,
        })
    });

    answerAttachmentList.update(answerAttachment);

    answer.content =content;
    answer.attachments=answerAttachmentList;

    await this.answerRepository.save(answer);

        return right({answer});
	}
}