import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { AnswerCreatedEvent } from "../../enterprise/events/answer-created-event";
import { QuestionRepository } from "../repositories/question-repository";
import { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification";

export class OnAnswerCreated implements EventHandler{

    constructor(private questionRepository:QuestionRepository,
                private sendNotification:SendNotificationUseCase){
        this.setupSubscriptions();
    }
    setupSubscriptions(): void {
        DomainEvents.register(
            this.sendNewAnswerNotification.bind(this),
            AnswerCreatedEvent.name)
    }

    private async sendNewAnswerNotification({Aggregate}:AnswerCreatedEvent){

        const question=await this.questionRepository.findById(Aggregate.questionId.toString());
        if(question){
            this.sendNotification.execute({
                recipientId:question.authorId.toString(),
                title:`Nova resposta em "${question.title.substring(0,40).concat('...')}"`,
                content:Aggregate.excerpt
            })
        }
        
    }
    
}