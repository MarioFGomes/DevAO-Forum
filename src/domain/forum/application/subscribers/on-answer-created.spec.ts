import { makeAnswer } from "test/factories/make-answer"
import { OnAnswerCreated } from "./on-answer-created"
import { InMemoryAnswerRepository } from "test/repositories/In-memory-answer-question-repository"
import { InMemoryAnswerAttachmentRepository } from "test/repositories/In-memory-answer-attachment-repository";

let inMemoryAnswerRepository:InMemoryAnswerRepository;
let inMemoryAnswerAttachmentRepository:InMemoryAnswerAttachmentRepository
describe('Subscriber notification',() => {
    beforeAll(() => {
        inMemoryAnswerAttachmentRepository=new InMemoryAnswerAttachmentRepository();
        inMemoryAnswerRepository=new InMemoryAnswerRepository(inMemoryAnswerAttachmentRepository);
    })

    it('should be able send notification when an answer is created',() => {
        const subscriber = new OnAnswerCreated()
        const answer=makeAnswer();
        inMemoryAnswerRepository.create(answer);
    })
})