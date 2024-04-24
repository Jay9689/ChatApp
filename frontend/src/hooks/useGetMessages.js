import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {

    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedCoversation } = useConversation()

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/messages/${selectedCoversation._id}`);
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setMessages(data)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        if (selectedCoversation?._id) getMessages();
    }, [selectedCoversation?._id, setMessages])
    return { messages, loading }
}

export default useGetMessages