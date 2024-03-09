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

    
    async create(data: AnswerComment) 
    {
        this.item.push(data);
    }

    async save(answerComment: AnswerComment) {
        const IndexId=this.item.findIndex((item) => item.id===answerComment.id);
        this.item[IndexId] = answerComment;
    }

    async delete(answerComment: AnswerComment){
        const IndexId=this.item.findIndex((item) => item.id===answerComment.id);
        this.item.splice(IndexId,1);
    }

}