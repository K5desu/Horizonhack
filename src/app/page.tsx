'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';
import{GET} from "@/app/get"

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [pcurl,setPcurl]=useState<string | null>(null);

  return (
    <>
      <h1>Upload Your Workimage</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
          }

          const file = inputFileRef.current.files[0];

          const response = await fetch(
            `/api/file?filename=${file.name}`,
            {
              method: 'POST',
              body: file,
            },
          );

          const newBlob = (await response.json()) as PutBlobResult;
          
          

          setBlob(newBlob);//newBlob.url情報をデータベースに保存
          const picture = await fetch(
            `/api/file?url=${newBlob.url}`,
            {
              method: 'GET',
              
            },
          );
          console.log(picture.url);
          setPcurl(picture.url);
          


        }}

      >
        <input name="file" ref={inputFileRef} type="file" required />
        <input type="text" id="name" name="name" className='box-border' placeholder='タイトル入力してください' required/>
        <button type="submit">Upload</button>
        
      </form>
      {blob && (
        <div>

          Blob url: <a href={blob.url}>{blob.url}</a>

       
          
          
        </div>
      )}
    </>
  );
}
