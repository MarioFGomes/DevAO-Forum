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
import { OnQuestionBestAnswerChosen } from "./on-question-best-answer-chosen";



let sendNotificationExecuteSpy:MockInstance<[SendNotificationRequest],Promise<SendNotificationResponse>>
let inMemoryQuestionRepository:InMemoryQuestionRepository;
let inMemoryQuestionAttachmentRepository:InMemoryQuestionAttachmentRepository
let sendNotification:SendNotificationUseCase;
let inMemoryNotificationRepository:InMemoryNotificationRepository
let inMemoryAnswerRepository:InMemoryAnswerRepository;
let inMemoryAnswerAttachmentRepository:InMemoryAnswerAttachmentRepository
describe('On Question best answer chosen',() => {
    beforeAll(() => {
        inMemoryQuestionAttachmentRepository=new InMemoryQuestionAttachmentRepository();
        inMemoryQuestionRepository=new InMemoryQuestionRepository(inMemoryQuestionAttachmentRepository);
        inMemoryAnswerAttachmentRepository=new InMemoryAnswerAttachmentRepository();
        inMemoryNotificationRepository=new InMemoryNotificationRepository();
        sendNotification=new SendNotificationUseCase(inMemoryNotificationRepository);
        inMemoryAnswerRepository=new InMemoryAnswerRepository(inMemoryAnswerAttachmentRepository);

    sendNotificationExecuteSpy=vi.spyOn(sendNotification,'execute');

    new OnQuestionBestAnswerChosen(inMemoryAnswerRepository,sendNotification);
    })
    

    it('should be able send notification when a question has new best answer chosen',async () => {
        
        const question=makeQuestion()
        const answer=makeAnswer({questionId:question.id});

        inMemoryQuestionRepository.create(question)
        inMemoryAnswerRepository.create(answer);

        question.bestAnswerId=answer.id;

        inMemoryQuestionRepository.save(question);

        await waitFor(() =>{
            expect(sendNotificationExecuteSpy).toBeCalled();
        })
    })
})