import Converstion from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Converstion.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (!conversation) {
            conversation = await Converstion.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        //  Socet Io functionality   // await conversation.save() 1s// await newMessage.save()1s

        // This will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]) //sametie
        res.status(201).json(newMessage)
        // console.log("message was send", req.params.id)

    } catch (error) {
        console.log("errror in sendMessage controller", error.message)
        res.status(500).json({ error: "internal server error" })
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Converstion.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages"); //Not ref but Actual messages

        if (!conversation) return res.status(200).json([])

        const messages = conversation.messages

        res.status(200).json(messages);


    } catch (error) {
        console.log("error in getMessage Controller", error.message)
        res.status(500).json({ error: "internal server error" })
    }
}