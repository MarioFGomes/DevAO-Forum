import { DomainEvent } from "@/core/events/domain-event";
import { AnswerComment } from "../entities/answer-comment";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export class AnswerCommentedEvent implements DomainEvent{
    ocurredAt: Date;
    answerComment:AnswerComment;
    constructor(answer:AnswerComment){
        this.answerComment = answer;
        this.ocurredAt=new Date();
    }
    getAggregateId(): UniqueEntityID {
        return this.answerComment.id;
    }

}