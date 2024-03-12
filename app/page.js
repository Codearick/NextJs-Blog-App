"use client"

import Config from "@/app/config/config";

export default function Home() {
  console.log(Config.appwriteUrl);
  
  return (
    <>
      <h1>A blog app with appwrite</h1>
    </>
  );
}
