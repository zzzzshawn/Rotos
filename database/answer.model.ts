import { Document, Schema, model, models } from "mongoose";

export interface IAnswer extends Document {
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  content: string;
  upvotes: Schema.Types.ObjectId[]; // array of user ids, to know who voted and to allow only 1 vote
  downvotes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const AnswerSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  content: { type: String, required: true },
  upvotes: [ {type: Schema.Types.ObjectId, ref: "User"} ],
  downvotes: [ {type: Schema.Types.ObjectId, ref: "User"} ], 
  createdAt: { type: Date, default: Date.now }
});

const Answer = models.Answer || model("Answer", AnswerSchema);

export default Answer;
