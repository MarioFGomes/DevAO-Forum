import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DomainEvent } from "@/core/events/domain-event";
import { Answer } from "../entities/answer";


export class AnswerCreatedEvent implements DomainEvent{
    ocurredAt: Date;
    Aggregate:Answer;
    constructor(answer:Answer){
        this.Aggregate = answer;
        this.ocurredAt=new Date();
    }
    getAggregateId(): UniqueEntityID {
        return this.Aggregate.id;
    }

}