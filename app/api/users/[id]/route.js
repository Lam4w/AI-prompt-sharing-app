import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        
        const user = await User.findById(params.id);

        return new Response(JSON.stringify(user), {
            status: 200
        });
    } catch (err) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
};