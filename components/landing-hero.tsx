"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (


    <div className="text-white font-bold py-36 text-center space-y-5 flex justify-center items-center flex-col h-90vh" style={{height:90 + "vh"}}>
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best AI Tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                "Chatbot.",
                "Image Generation.",
                "Video Generation.",
                "Code Generation."
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Create content using AI
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
        </Link>
      </div>
    </div>
  );
};