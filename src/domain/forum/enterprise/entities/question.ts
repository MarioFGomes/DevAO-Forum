import { AggregateRoot } from '@/core/entities/aggregate-root';
import { Slug } from './value-objects/slug';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import dayjs from 'dayjs';
import { QuestionAttachment } from './question-attachment';
import { QuestionAttachmentList } from './question-attachment-list';


export interface QuestionProps{
    authorId: UniqueEntityID,
    bestAnswerId?: UniqueEntityID
	attachments:QuestionAttachmentList,
    title: string, 
    content: string,
    slug:Slug,
    createdAt: Date,
    updatedAt?: Date
}

export class Question extends AggregateRoot<QuestionProps>{
	get content(){
		return this.props.content;
	}
    
	set content(content: string){
		this.props.content = content;
		this.touch();
	}

	get title(){
		return this.props.title;
	}

	set title(title: string){
		this.props.title = title;
		this.props.slug=Slug.CreateFromText(title);
		this.touch();
	}

    
	get bestAnswerId(){
		return this.props.bestAnswerId;
	}

	set bestAnswerId(bestAnswerId: UniqueEntityID | undefined){
		this.props.bestAnswerId = bestAnswerId;
		this.touch();
	}

	get slug(){
		return this.props.slug;
	}

	get attachments(){
		return this.props.attachments;
	}

	set attachments(attachments:QuestionAttachmentList){
		this.props.attachments = attachments;
		this.touch();
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

	get excerpt(){
		return this.content.substring(0,120)
			.trimEnd().concat('...');
	}

	get isNew(): boolean {
		return dayjs().diff(this.props.createdAt,'day')<=3;
	}


	static Create(props: Optional<QuestionProps,'createdAt' |'slug' | 'attachments'>, id?: UniqueEntityID){
		const question=new Question({
			...props,
			slug:props.slug ?? Slug.CreateFromText(props.title),
			attachments:props.attachments || new QuestionAttachmentList(),
			createdAt:props.createdAt ?? new Date()
		},id);

		return question;
	}
}