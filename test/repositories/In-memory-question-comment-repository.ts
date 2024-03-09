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