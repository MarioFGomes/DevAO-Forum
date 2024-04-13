import { DomainEvents } from "@/core/events/domain-events";
import { PaginationParams } from "@/core/share/repositories/pagination-params";
import { AnswerCommentRepository } from "@/domain/forum/application/repositories/answer-comment-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryCommentOnAnswerRepository implements AnswerCommentRepository {

    public item:AnswerComment []=[];

    async findById(id: string) 
    {
        const answerComment=this.item.find(item => item.id.toString() === id);
        if(!answerComment) return null;

        return answerComment;
    }

    async findManyAnswerComment(answerId: string, {page}: PaginationParams) {
        const answerComments=this.item.filter(e=>e.answerId.toString()===answerId)
        .sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice((page-1)*20,page*20);
        return answerComments
    }

    
    async create(data: AnswerComment) 
    {
        this.item.push(data);
        DomainEvents.dispatchEventsForAggregate(data.id)
    }

    async save(answerComment: AnswerComment) {
        const IndexId=this.item.findIndex((item) => item.id===answerComment.id);
        this.item[IndexId] = answerComment;
        DomainEvents.dispatchEventsForAggregate(answerComment.id)
    }

    async delete(answerComment: AnswerComment){
        const IndexId=this.item.findIndex((item) => item.id===answerComment.id);
        this.item.splice(IndexId,1);
    }

}