import { makeQuestion } from "test/factories/make-question"
import { InMemoryQuestionAttachmentRepository } from "test/repositories/In-memory-question-attachment-repository";
import { SendNotificationRequest, SendNotificationResponse, SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification";
import { InMemoryNotificationRepository } from "test/repositories/In-memory-notification-send-repository";
import { MockInstance } from "vitest";
import { waitFor } from "test/utils/wait-for";
import { InMemoryCommentOnQuestionRepository } from "test/repositories/In-memory-question-comment-repository";
import { makeQuestionComment } from "test/factories/make-question-comment";
import { OnQuestionCommented } from "./on-question-commented";
import { InMemoryQuestionRepository } from "test/repositories/In-memory-question-repository";

let sendNotificationExecuteSpy:MockInstance<[SendNotificationRequest],Promise<SendNotificationResponse>>
let inMemoryQuestionRepository:InMemoryQuestionRepository;
let inMemoryQuestionAttachmentRepository:InMemoryQuestionAttachmentRepository
let sendNotification:SendNotificationUseCase;
let inMemoryNotificationRepository:InMemoryNotificationRepository
let inMemoryCommentOnQuestionRepository:InMemoryCommentOnQuestionRepository;
describe('On Question commented',() => {
    beforeAll(() => {
        inMemoryQuestionAttachmentRepository=new InMemoryQuestionAttachmentRepository();
        inMemoryQuestionRepository=new InMemoryQuestionRepository(inMemoryQuestionAttachmentRepository);
        inMemoryQuestionAttachmentRepository=new InMemoryQuestionAttachmentRepository();
        inMemoryNotificationRepository=new InMemoryNotificationRepository();
        inMemoryCommentOnQuestionRepository=new InMemoryCommentOnQuestionRepository()
        sendNotification=new SendNotificationUseCase(inMemoryNotificationRepository);
        inMemoryQuestionRepository=new InMemoryQuestionRepository(inMemoryQuestionAttachmentRepository);

    sendNotificationExecuteSpy=vi.spyOn(sendNotification,'execute');

        new OnQuestionCommented(inMemoryQuestionRepository,sendNotification);
    })
    

    it('should be able send notification when an question is commented',async () => {
        
        const question=makeQuestion()
        const questionCommented=makeQuestionComment({
            questionId:question.id,
        });

        inMemoryQuestionRepository.create(question)
        inMemoryQuestionRepository.create(question);
        inMemoryCommentOnQuestionRepository.create(questionCommented);

        await waitFor(() =>{
            expect(sendNotificationExecuteSpy).toBeCalled();
        })
    })
})