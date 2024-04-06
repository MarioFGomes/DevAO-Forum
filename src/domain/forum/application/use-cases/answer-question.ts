import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answers-repository';
import {Either, right} from '@/core/either';
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment';
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list';


interface AnswerQuestionRequest{
    instructorId: string;
    questionId: string;
	attachmentIds: string[], 
    content: string;
}
type  AnswerQuestionResponse=Either<null,
{
	answer: Answer
}>

export class AnswerQuestionUseCase{
	constructor(private answerRepository:AnswerRepository){}

	async execute({instructorId,questionId,content,attachmentIds}:AnswerQuestionRequest):Promise<AnswerQuestionResponse>
	{
		const answer=Answer.Create({
			content,
			authorId:new UniqueEntityID(instructorId),
			questionId:new UniqueEntityID(questionId),
		});

		const answerAttachment=attachmentIds.map((attachmentId) =>{
            return AnswerAttachment.create({
                attachmentId: new UniqueEntityID(attachmentId),
                answerId: answer.id,
            })
        });

        answer.attachments=new AnswerAttachmentList(answerAttachment);
        
		await this.answerRepository.create(answer);

		return right({answer});
	}
}