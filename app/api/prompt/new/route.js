import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

/*To create a new route. */
export const POST = async(req, res) => {
    /* First we need to grab the things we have passed through the POST request */
    const  { userId, prompt, tag } = await req.json();
    
    /* Then we need to connect to the database */
    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        /* 500 error-> Server Error. */
        return new Response("Failed to create a prompt", { status: 500 });
        
    }
}