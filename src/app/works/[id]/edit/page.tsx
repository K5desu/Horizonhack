'use client'

import type { PutBlobResult } from '@vercel/blob'
import { useState, useRef } from 'react'

import { useParams } from 'next/navigation'
import { editWork } from './edit'

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const inputUrlRef = useRef<HTMLInputElement>(null)
  const inputTitleRef = useRef<HTMLInputElement>(null)
  const [blob, setBlob] = useState<PutBlobResult | null>(null)
  const { id } = useParams() //動的ルーティングのid取得

  return (
    <>
      <h1>Upload Your Workimage</h1>

      <form
        onSubmit={async (event) => {
          //blobに画像データpost
          event.preventDefault()

          if (!inputFileRef.current?.files) {
            throw new Error('No file selected')
          }

          const file = inputFileRef.current.files[0]

          const response = await fetch(`/api/file?filename=${file.name}`, {
            method: 'POST',
            body: file,
          })

          const newBlob = (await response.json()) as PutBlobResult //挿入した画像のurl帰ってくる

          setBlob(newBlob)
          //url,imgurl,title,を作成時はidで挿入 idはurlから取得
          //この三つの値をpostまたはeditへ
          //urlあるかどうか確認

          //url,imgurl,title,を作成時はidで挿入 idはurlから取得
          //このidはimgid
          if (inputTitleRef.current?.value && inputUrlRef.current?.value && newBlob.url && id) {
            await editWork(
              String(id),
              inputTitleRef.current?.value,
              inputUrlRef.current.value,
              newBlob.url
            )
          }
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <input
          type="text"
          id="name"
          name="url"
          className="box-border"
          placeholder="urlを貼り付けてください"
          ref={inputUrlRef}
          required
        />
        <input
          type="text"
          id="name"
          name="title"
          className="box-border"
          placeholder="タイトル入力してください"
          required
          ref={inputTitleRef}
        />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  )
}
