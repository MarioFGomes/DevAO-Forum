import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification";
import { QuestionBestAnswerChosenEvent } from "../../enterprise/events/question-best-answer-chosen-event";
import { AnswerRepository } from "../repositories/answers-repository";

export class OnQuestionBestAnswerChosen implements EventHandler{

    constructor(private answerRepository:AnswerRepository,
                private sendNotification:SendNotificationUseCase){
        this.setupSubscriptions();
    }
    setupSubscriptions(): void {
        DomainEvents.register(
            this.sendNewNotification.bind(this),
            QuestionBestAnswerChosenEvent.name)
    }

    private async sendNewNotification({question,bestAnswerId}:QuestionBestAnswerChosenEvent){

        const answer=await this.answerRepository.findById(bestAnswerId.toString());
        if(answer){
            this.sendNotification.execute({
                recipientId:answer.authorId.toString(),
                title:`Sua resposta foi escolhida! `,
                content:`A resposta que você enviou em "${question.title.substring(0,40).concat('...')}" 
                foi escolhida pelo autor!`
            })
        }
        
    }
    
}