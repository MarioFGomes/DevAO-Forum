import { PaginationParams } from "@/core/share/repositories/pagination-params";
import { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { InMemoryQuestionAttachmentRepository } from "./In-memory-question-attachment-repository";
import { DomainEvents } from "@/core/events/domain-events";

export class InMemoryQuestionRepository implements QuestionRepository {

    public item:Question []=[];
    constructor(private inMemoryQuestionAttachmentRepository:InMemoryQuestionAttachmentRepository){}
    
    async findById(id: string) 
    {
        const question=this.item.find(item => item.id.toString() === id);
        if(!question) return null;

        return question;
    }
    

    async findBySlug(slug: string) 
    {
        const question=this.item.find(item => item.slug.value === slug);
        if(!question) return null;

        return question;
    }

    async fetchManyRecent({page}: PaginationParams) 
    {
        const questions=this.item.sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice((page-1)*20,page*20);
        return questions
    }

    async create(data: Question) 
    {
        this.item.push(data);
        DomainEvents.dispatchEventsForAggregate(data.id)
    }

    async save(question: Question) {
        const IndexId=this.item.findIndex((item) => item.id===question.id);
        this.item[IndexId] = question;
        DomainEvents.dispatchEventsForAggregate(question.id)
    }

    async delete(question: Question)
    {
        const IndexId=this.item.findIndex((item) => item.id===question.id);
        this.item.splice(IndexId,1);

        this.inMemoryQuestionAttachmentRepository.deleteManyByQuestionId(question.id.toString())
    }
    
}