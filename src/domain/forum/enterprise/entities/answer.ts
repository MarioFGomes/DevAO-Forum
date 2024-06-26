import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { AnswerAttachmentList } from './answer-attachment-list';
import { AggregateRoot } from '@/core/entities/aggregate-root';
import { AnswerCreatedEvent } from '../events/answer-created-event';


export interface AnswerProps{
    questionId: UniqueEntityID,
    authorId: UniqueEntityID
    content: string,
	attachments:AnswerAttachmentList
    createdAt: Date,
    updatedAt?: Date
}


export class Answer extends AggregateRoot<AnswerProps>{

	get content(){
		return this.props.content;
	}

	set content(content: string){
		this.props.content = content;
		this.touch();
	}

    
	get questionId(){
		return this.props.questionId;
	}

    
	get authorId(){
		return this.props.authorId;
	}

    
	get createdAt(){
		return this.props.createdAt;
	}


    
	get updatedAt(){
		return this.props.updatedAt;
	}

	private touch(){
		this.props.updatedAt= new Date();
	}
	get attachments(){
		return this.props.attachments;
	}

	set attachments(attachments:AnswerAttachmentList){
		this.props.attachments= attachments;
		this.touch();
	}

	get excerpt(){
		return this.content.substring(0,120)
			.trimEnd().concat('...');
	}


	static Create(props: Optional<AnswerProps,'createdAt'| 'attachments'>, id?: UniqueEntityID){
		const answer=new Answer({
			...props,
			createdAt: props.createdAt ?? new Date(),
			attachments:props.attachments || new AnswerAttachmentList()
		},id);

	const IsNewAnswer = !id

	if(IsNewAnswer) answer.addDomainEvent(new AnswerCreatedEvent(answer));
	return answer;
}
}