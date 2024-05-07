import mongoose from "mongoose";

interface conversationSchemaInterface {
  messeges: {
    author: string;
    messegeType: "image" | "text";
    content: string;
  }[];
}

const conversationSchema = new mongoose.Schema<conversationSchemaInterface>({});
