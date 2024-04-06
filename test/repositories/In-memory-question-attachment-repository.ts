import { QuestionAttachmentRepository } from "@/domain/forum/application/repositories/question-attachment-repository";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";


export class InMemoryQuestionAttachmentRepository implements QuestionAttachmentRepository {
   
    public item:QuestionAttachment []=[];

    async fetchManyByQuestionId(questionId: string){
        
        return this.item.filter(item => item.questionId.toString() === questionId);
    }

    async deleteManyById(questionId: string) {
        const questionAttachment=this.item.filter(item => item.questionId.toString()!== questionId);
        this.item=questionAttachment;
    }
}