import { makeAnswer } from "test/factories/make-answer"
import { InMemoryAnswerRepository } from "test/repositories/In-memory-answer-question-repository"
import { InMemoryAnswerAttachmentRepository } from "test/repositories/In-memory-answer-attachment-repository";
import { SendNotificationRequest, SendNotificationResponse, SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification";
import { InMemoryQuestionRepository } from "test/repositories/In-memory-question-repository";
import { InMemoryQuestionAttachmentRepository } from "test/repositories/In-memory-question-attachment-repository";
import { InMemoryNotificationRepository } from "test/repositories/In-memory-notification-send-repository";
import { makeQuestion } from "test/factories/make-question";
import { MockInstance } from "vitest";
import { waitFor } from "test/utils/wait-for";
import { InMemoryCommentOnAnswerRepository } from "test/repositories/In-memory-answer-comment-repository";
import { makeAnswerComment } from "test/factories/make-answer-comment";
import { OnAnswerCommented } from "./on-answer-commented";



let sendNotificationExecuteSpy:MockInstance<[SendNotificationRequest],Promise<SendNotificationResponse>>
let sendNotification:SendNotificationUseCase;
let inMemoryNotificationRepository:InMemoryNotificationRepository
let inMemoryAnswerRepository:InMemoryAnswerRepository;
let inMemoryAnswerAttachmentRepository:InMemoryAnswerAttachmentRepository
let inMemoryCommentOnAnswerRepository:InMemoryCommentOnAnswerRepository;
describe('On Answer commented',() => {
    beforeAll(() => {
        inMemoryAnswerAttachmentRepository=new InMemoryAnswerAttachmentRepository();
        inMemoryNotificationRepository=new InMemoryNotificationRepository();
        inMemoryCommentOnAnswerRepository=new InMemoryCommentOnAnswerRepository()
        sendNotification=new SendNotificationUseCase(inMemoryNotificationRepository);
        inMemoryAnswerRepository=new InMemoryAnswerRepository(inMemoryAnswerAttachmentRepository);

        sendNotificationExecuteSpy=vi.spyOn(sendNotification,'execute');

        new OnAnswerCommented(inMemoryAnswerRepository,sendNotification);
    })
    

    it('should be able send notification when an answer is commented',async () => {
        
        const question=makeQuestion()
        const answer=makeAnswer({questionId:question.id});
        const answerCommented=makeAnswerComment({
            answerId:answer.id,
        });

        await inMemoryAnswerRepository.create(answer)
        await inMemoryCommentOnAnswerRepository.create(answerCommented);

        await waitFor(() =>{
            expect(sendNotificationExecuteSpy).toBeCalled();
        })
    })
})