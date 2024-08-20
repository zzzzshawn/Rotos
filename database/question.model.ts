import { Document, Schema, model, models } from "mongoose";

export interface IQuestion extends Document {
  // Extends Documents because it has additional properties like _id which are used in mongodb

  title: string;
  content: string;
  tags: Schema.Types.ObjectId[];
  views: number;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  answers: Schema.Types.ObjectId[];
  createdAt: Date;

}

const QusetionSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    views: { type: Number, default: 0 },
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    createdAt: { type: Date, default: Date.now }
})

// turn the question schema into a model, if model doesnt exist create a model -> model('Question', QusetionSchema). models.Question -> is to check if model exists
const Question = models.Question || model('Question', QusetionSchema);

export default Question;

