import { PaginationParams } from '@/core/share/repositories/pagination-params';
import { Answer } from '@/domain/forum/enterprise/entities/answer';


export interface AnswerRepository {
    findById(id:string):Promise<Answer |null>
    findManyQuestionId(questionId:string,page:PaginationParams):Promise<Answer[]>
    create(answer:Answer):Promise<void>;
    save(answer:Answer):Promise<void>;
    delete(answer:Answer):Promise<void>;
}