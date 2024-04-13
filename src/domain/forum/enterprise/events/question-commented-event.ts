import { DomainEvent } from "@/core/events/domain-event";
import { QuestionComment } from "../entities/question-comment";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export class QuestionCommentedEvent implements DomainEvent{
    ocurredAt: Date;
    questionComment:QuestionComment;
    constructor(question:QuestionComment){
        this.questionComment = question;
        this.ocurredAt=new Date();
    }
    getAggregateId(): UniqueEntityID {
        return this.questionComment.id;
    }

}