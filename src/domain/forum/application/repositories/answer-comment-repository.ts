import { PaginationParams } from "@/core/share/repositories/pagination-params";
import { AnswerComment } from "../../enterprise/entities/answer-comment";


export interface AnswerCommentRepository {
    findById(id: string): Promise<AnswerComment | null>;
    findManyAnswerComment(answerId:string,page:PaginationParams):Promise<AnswerComment[]>
    create(answer:AnswerComment):Promise<void>;
    save(questionComment:AnswerComment): Promise<void>;
    delete(questionComment:AnswerComment):Promise<void>;
}