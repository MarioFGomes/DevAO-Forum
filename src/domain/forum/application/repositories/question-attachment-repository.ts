import { QuestionAttachment } from "../../enterprise/entities/question-attachment";


export interface QuestionAttachmentRepository
{
    fetchManyByQuestionId(questionId:string):Promise<QuestionAttachment[]>
    deleteManyById(questionId:string):Promise<void>
}