import { PaginationParams } from "@/core/share/repositories/pagination-params";
import { QuestionCommentRepository } from "@/domain/forum/application/repositories/question-comment-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryCommentOnQuestionRepository implements QuestionCommentRepository {

    public item:QuestionComment []=[];

    async findById(id: string) 
    {
        const questionComment=this.item.find(item => item.id.toString() === id);
        if(!questionComment) return null;

        return questionComment;
    }

    async findManyQuestionComment(questionId:string,{page}: PaginationParams) 
    {
        const questionComments=this.item.filter(e=>e.questionId.toString()===questionId)
        .sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice((page-1)*20,page*20);
        return questionComments
    }


    async create(data: QuestionComment) 
    {
        this.item.push(data);
    }

    async save(questionComment: QuestionComment) 
    {
        const IndexId=this.item.findIndex((item) => item.id===questionComment.id);
        this.item[IndexId] = questionComment;
    }


    async delete(questionComment: QuestionComment) 
    {
        const IndexId=this.item.findIndex((item) => item.id===questionComment.id);
        this.item.splice(IndexId,1);
    }

}