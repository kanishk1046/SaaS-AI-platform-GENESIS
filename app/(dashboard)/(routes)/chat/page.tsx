"use client";

// import * as z from "zod";
// import { Heading } from "@/components/heading";
// import { MessageSquare } from "lucide-react";
// import { Form, useForm } from "react-hook-form";
// import { formSchema } from "./constants";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { FormControl, FormField, FormItem } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// const  ConversationPage = () => {
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues:{
//             prompt: ""
//         }
//     });

//     const isLoading = form.formState.isSubmitting;

//     const onSubmit = async(values: z.infer<typeof formSchema>) => {
//         console.log(values);
//     };

//     return(
//         <div>
//             <Heading 
//                 title="Genesis Chat"
//                 description="Our most advanced chat-bot model."
//                 icon={MessageSquare}
//                 iconColor="text-violet-500"
//                 bgColor="bg-violet-500/10"
//             />
//             <div className="px-4 lg:px-8">
//                 <div>
//                     <Form {...form}>
//                         <form 
//                             onSubmit={form.handleSubmit(onSubmit)}
//                             className="
//                                 rounded-lg
//                                 border
//                                 w-full
//                                 p-4
//                                 px-3
//                                 md:px-6
//                                 focus-within:shadow-sm
//                                 grid
//                                 grid-cols-12
//                                 gap-2
//                             "
//                         >
//                             <FormField 
//                                 name="prompt"
//                                 render={({field}) => (
//                                     <FormItem className="col-span-12 lg:col-span-10">
//                                         <FormControl className="m-0 p-0">
//                                             <Input 
//                                                 className="border-0 outline-none focus-visible:ring-0 focus-visible: ring-transparent"
//                                                 disabled={isLoading}
//                                                 placeholder="How do I calculate the radius of a circle?"
//                                                 {...field}
//                                             />
//                                         </FormControl>
//                                     </FormItem>
//                                 )}
//                             />
//                             <Button className="col-span-12 lg:col-span-2">
//                                 Generate
//                             </Button>
//                         </form>
//                     </Form>
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default ConversationPage;

import { useState } from "react";
import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
// import ChatCompletionRequestMessage from "openai";

const ConversationPage = () => {
    const [formData, setFormData] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ismessages, setMessages] = useState<{ type: string; message: string }[]>([]);

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.trim()) {
            return; // Don't submit empty messages
        }
    
        try {
            setIsSubmitting(true);
            /
            // Send user message
            const userMessage = { type: 'user', message: formData };
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            
            // Send user message to OpenAI API
            const response = await axios.post('https://api.openai.com/v1/chat/completions',{model: "gpt-3.5-turbo",messages: [{ role: "user", content: formData }]},{headers: {'Content-Type': 'application/json','Authorization': `Bearer ${key}`}}
            );
    
            // Add bot response to messages
            const botResponse = response.data.choices[0];
            setMessages((prevMessages) => [...prevMessages, { type: 'bot', message: botResponse.message.content }]);
            console.log('Bot response:', botResponse.message.content);
            console.log(ismessages)
            // Clear form data after submission
            setFormData('');
        } catch (error) {
            console.error('Error submitting message:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div>
            <Heading
                title="Genesis Chat"
                description="Our most advanced chat-bot model."
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <div className="px-4 lg:px-8">
                <form onSubmit={handleSubmit} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                    <div className="col-span-12 lg:col-span-10">
                        <input
                            type="text"
                            name="prompt"
                            value={formData}
                            onChange={(e)=>setFormData(e.target.value)}
                            className="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                            disabled={isSubmitting}
                            placeholder="How do I calculate the radius of a circle?"
                        />
                    </div>
                    <Button type="submit" className="col-span-12 lg:col-span-2 w-full">
                        Generate
                    </Button>
                </form>
            </div>
            
            <div className="space-y-4 mt-4 px-8">

        {isSubmitting ? (
            <div>Loading...</div>) : (
                <div className="flex flex-col-reverse gap-y-4">
        {ismessages.map((message, index) => (
            
            <div 
            key={message.message} 
            className={
                "p-8 w-full flex items-start gap-x-8 rounded-lg bg-white border border-black/10"
            }  
            >
                {message.type === "user" ? <UserAvatar /> : <BotAvatar />}
            <p className="text-sm" key={index}>{message.message}</p>
            </div>


// return null;
))}
        </div>)}
</div>
       
        </div>
    );
};

export default ConversationPage;
