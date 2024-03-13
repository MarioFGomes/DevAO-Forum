import { PaginationParams } from "@/core/share/repositories/pagination-params";
import { QuestionComment } from "../../enterprise/entities/question-comment";


export interface QuestionCommentRepository {
    findById(id: string): Promise<QuestionComment | null>;
    findManyQuestionComment(questionId:string,page:PaginationParams):Promise<QuestionComment[]>
    create(questionComment:QuestionComment):Promise<void>;
    save(questionComment:QuestionComment): Promise<void>;
    delete(questionComment:QuestionComment):Promise<void>;
}