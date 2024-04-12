import { PaginationParams } from "@/core/share/repositories/pagination-params";
import { AnswerRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { InMemoryAnswerAttachmentRepository } from "./In-memory-answer-attachment-repository";
import { DomainEvents } from "@/core/events/domain-events";

export class InMemoryAnswerRepository implements AnswerRepository {
    
    public item:Answer []=[];

    constructor(private inMemoryAnswerAttachmentRepository:InMemoryAnswerAttachmentRepository){}
    
    async findById(id: string) 
    {
        const answer=this.item.find(item => item.id.toString() === id);
        if(!answer) return null;

        return answer;
    }

    async findManyQuestionId(questionId: string, {page}: PaginationParams) {
        const answer=this.item.filter((item)=> item.questionId.toString() === questionId)
        .sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice((page-1)*20,page*20);
        return answer;
    }

    async create(data: Answer) {
        this.item.push(data);
        DomainEvents.dispatchEventsForAggregate(data.id)
    }

    async save(answer: Answer) {
        const IndexId=this.item.findIndex((item) => item.id===answer.id);
        this.item[IndexId] = answer;
        DomainEvents.dispatchEventsForAggregate(answer.id)
    }

    async delete(answer: Answer)
    {
        const IndexId=this.item.findIndex((item) => item.id===answer.id);
        this.item.splice(IndexId,1);
        this.inMemoryAnswerAttachmentRepository.deleteManyByAnswerId(answer.id.toString())
    }
    
}