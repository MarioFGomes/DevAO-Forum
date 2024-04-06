import { QuestionAttachment } from "../../enterprise/entities/question-attachment";


export interface QuestionAttachmentRepository
{
    fetchManyByQuestionId(questionId:string):Promise<QuestionAttachment[]>
    deleteManyByQuestionId(questionId:string):Promise<void>
}