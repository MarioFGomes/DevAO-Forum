import { AnswerComment } from "../../enterprise/entities/answer-comment";


export interface AnswerCommentRepository {
    findById(id: string): Promise<AnswerComment | null>;
    create(answer:AnswerComment):Promise<void>;
    save(questionComment:AnswerComment): Promise<void>;
    delete(questionComment:AnswerComment):Promise<void>;
}