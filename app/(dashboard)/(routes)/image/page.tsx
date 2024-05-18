"use client";

import { useState } from "react";
import { Heading } from "@/components/heading";
import { ImageIcon, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import Image from "next/image";
// import ChatCompletionRequestMessage from "openai";

const ImagePage = () => {
    const [formData, setFormData] = useState({
        model:"dall-e-2",
        prompt:'',
        // n:'1',
        size:'256x256'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [ismessages, setMessages] = useState<{ type: string; message: string }[]>([]);
    const [images,setImages]=useState('')

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (!formData.trim()) {
        //     return; // Don't submit empty messages
        // }
    
        try {
            setImages('')
            setIsSubmitting(true);
            
            console.log(formData)
            // Send user message to OpenAI API
            const response = await axios.post('https://api.openai.com/v1/images/generations',formData,{headers: {'Content-Type': 'application/json','Authorization': `Bearer ${key}`}}
            );
    
            console.log(response.data)
            // const urls=response.data.map((image:{url:string})=>image.url)
            // setImages(urls)
            const urldata=response.data.data
            setImages(urldata[0].url)
        } catch (error) {
            console.error('Error submitting message:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div>
            <Heading
                title="Image Generation"
                description="Turn your prompt into image."
                icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
            />
            <div className="px-4 lg:px-8">
                <form onSubmit={handleSubmit} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                    <div className="col-span-12 lg:col-span-10">
                        <input
                            type="text"
                            name="prompt"
                            value={formData.prompt}
                            onChange={(e)=>setFormData({...formData,prompt:e.target.value})}
                            className="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                            disabled={isSubmitting}
                            placeholder="A horse eating grass"
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
                    {/* {images.map((src)=>(
                        <div>
                           
                        </div>
                    ))} */}
                    <img src={images} alt="" />
        </div>)}
</div>
       
        </div>
    );
};

export default ImagePage;
