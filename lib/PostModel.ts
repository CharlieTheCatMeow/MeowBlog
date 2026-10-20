import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        date: {
            type: Date,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: [String],
            required: true,
        },
        likes: {
            type: [String],
            default: [],
        }
    },
    { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);

export default Post;