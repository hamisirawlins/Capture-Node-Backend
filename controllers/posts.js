import PostMessage from "../models/postContent.js";
import mongoose from "mongoose";
export const getPosts = async (req, res) => {

    //Mongo DB Call
    try {
        const postMessages = await PostMessage.find();

        //Pagination
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const response = {}

        response.data = postMessages.slice(startIndex, endIndex);
        response.limit = limit
        if (startIndex > 0) {
            response.previous_page = {
                page: page - 1,
            }
        }
        if (endIndex < postMessages.length) {
            response.next_page = {
                page: page + 1,
            }
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params
    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post Available with that Id');
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost)
}

export const deletePost = async (req, res) => {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post Available with that Id');
    await PostMessage.findByIdAndRemove(id);
    res.json({ message: "Post Successfully deleted" })
}

export const likePost = async (req, res) => {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post Available with that Id');

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    res.json(updatedPost);
}