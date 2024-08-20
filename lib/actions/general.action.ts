
'use server';

import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";
import User from "@/database/user.model";
import Tag from "@/database/tag.model";



const searchableTypes = ['question', 'answer', 'user', 'tag'];

export const globalSearch = async (params: SearchParams) => {
  try {
    await connectToDatabase();
    const { query, type } = params;

    // turn the query into regular exp query
    const regexQuery = { $regex: query, $options: 'i' };

    let results = [];

    const modelsAndTypes = [
      {
        model: Question,
        searchField: 'title',
        type: 'question'
      },
      {
        model: User,
        searchField: 'name',
        type: 'user'
      },
      {
        model: Answer,
        searchField: 'content',
        type: 'answer'
      },
      {
        model: Tag,
        searchField: 'name',
        type: 'tag'
      }
    ];

    const typeLower = type?.toLowerCase();

    // this if logic means that none of the tags are selected, hence search the whole db
    if (!typeLower || !searchableTypes.includes(typeLower)) {
      // search across all models and every field (everything)

      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title:
              type === 'answer'
                ? `Answers containing ${query}`
                : item[searchField],
            type,
            id:
              type === 'user'
                ? item.clerkId
                : type === 'answer'
                ? item.questions
                : item._id
          }))
        );
      }
    } else {
      // search in the specified model type
      const modelInfo = modelsAndTypes.find((item) => item.type === type);

      if (!modelInfo) {
        throw new Error('Invalid search type');
      }

      const queryResults = await modelInfo.model
        .find({
          [modelInfo.searchField]: regexQuery
        })
        .limit(8);

      results = queryResults.map((item) => ({
        title:
          type === 'answer'
            ? `Answers containing ${query}`
            : item[modelInfo.searchField],
        type,
        id:
          type === 'user'
            ? item.clerkId
            : type === 'answer'
                ? item.questions
                : item._id
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log(`Error fetching global search ${error}`);
    throw error;
  }
};
