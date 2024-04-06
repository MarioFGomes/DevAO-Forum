import { Either, left, right } from "@/core/either";
import { AnswerRepository } from "../repositories/answers-repository";
import { UseCaseErrors } from "@/core/errors/use-case-error";
import { ResourceNotFound } from "@/core/errors/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";

interface DeleteAnswerRequest{
    answerId:string,
    authorId:string
}

type DeleteAnswerResponse=Either<UseCaseErrors,{}>

export class DeleteAnswerUseCase{
	constructor(private answerRepository:AnswerRepository){}

	async execute({answerId,authorId}:DeleteAnswerRequest):Promise<DeleteAnswerResponse>
    {
    const answer=await this.answerRepository.findById(answerId);

    if(!answer) return left(new ResourceNotFound());
    
    if(authorId!== answer.authorId.toString()) return left(new NotAllowedError());

    await this.answerRepository.delete(answer);

        return right({});
	}
}