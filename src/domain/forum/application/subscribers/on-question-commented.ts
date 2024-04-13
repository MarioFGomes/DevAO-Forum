import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification";
import { QuestionCommentedEvent } from "../../enterprise/events/question-commented-event";
import { QuestionRepository } from "../repositories/question-repository";

export class OnQuestionCommented implements EventHandler{

    constructor(private questionRepository:QuestionRepository,
                private sendNotification:SendNotificationUseCase){
        this.setupSubscriptions();
    }
    setupSubscriptions(): void {
        DomainEvents.register(
            this.sendNewNotification.bind(this),
            QuestionCommentedEvent.name)
    }

    private async sendNewNotification({questionComment}:QuestionCommentedEvent){

        const Question=await this.questionRepository.findById(questionComment.questionId.toString());
        if(Question){
            this.sendNotification.execute({
                recipientId:Question.authorId.toString(),
                title:`Um novo comentário foi adicionado a sua pergunta`,
                content:questionComment.content.substring(0,40).concat('...')
            })
        }
        
    }
    
}