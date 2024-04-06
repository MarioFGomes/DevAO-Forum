import { AnswerAttachmentRepository } from "@/domain/forum/application/repositories/answer-attachment-repository";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";


export class InMemoryAnswerAttachmentRepository implements AnswerAttachmentRepository {

    public item:AnswerAttachment []=[];

    async fetchManyByAnswerId(answerId: string){
        
        return this.item.filter(item => item.answerId.toString() === answerId);
    }

    async deleteManyByAnswerId(answerId: string) {
        const answerAttachment=this.item.filter(item => item.answerId.toString()!== answerId);
        this.item=answerAttachment;
    }
}