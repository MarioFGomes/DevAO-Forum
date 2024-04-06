import { UseCaseErrors } from "@/core/errors/use-case-error";

export class ResourceNotFound extends Error implements UseCaseErrors{
    constructor(){
        super("Resource Not Found");
    }
}