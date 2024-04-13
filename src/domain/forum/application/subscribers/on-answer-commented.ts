import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification";
import { AnswerRepository } from "../repositories/answers-repository";
import { AnswerCommentedEvent } from "../../enterprise/events/answer-commented-event";

export class OnAnswerCommented implements EventHandler{

    constructor(private answerRepository:AnswerRepository,
                private sendNotification:SendNotificationUseCase){
        this.setupSubscriptions();
    }
    setupSubscriptions(): void {
        DomainEvents.register(
            this.sendNewNotification.bind(this),
            AnswerCommentedEvent.name)
    }

    private async sendNewNotification({answerComment}:AnswerCommentedEvent){

        const Answer=await this.answerRepository.findById(answerComment.answerId.toString());
        if(Answer){
            this.sendNotification.execute({
                recipientId:Answer.authorId.toString(),
                title:`Um novo comentário foi adicionado a sua resposta`,
                content:answerComment.content.substring(0,40).concat('...')
            })
        }
        
    }
    
}