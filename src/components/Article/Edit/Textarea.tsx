'use client'

import React, { useRef, useEffect, useState } from 'react'

export default function Textarea({
  defaultValue,
  onChange,
}: {
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [lineCount, setLineCount] = useState(0)

  useEffect(() => {
    adjustHeight()
    if (textareaRef.current && textareaRef.current.scrollHeight > 100) {
      textareaRef.current.style.height = '136px'
    }
  }, [])

  const adjustHeight = () => {
    if (textareaRef.current) {
      // スクロール位置を保存
      const scrollTop = window.scrollY || document.documentElement.scrollTop

      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      const newLineCount = Math.floor(textareaRef.current.scrollHeight / 20)
      setLineCount(newLineCount)
      if (newLineCount > 6) {
        textareaRef.current.style.boxShadow = 'inset 0 -10px 10px -10px rgba(0,0,0,0.25)'
      } else {
        textareaRef.current.style.boxShadow = 'none'
      }

      // スクロール位置を元に戻す
      window.scrollTo(0, scrollTop)
    }
  }

  const handleInput = () => {
    adjustHeight()
  }

  const handleBlur = () => {
    if (textareaRef.current && textareaRef.current.scrollHeight > 100 && lineCount >= 6) {
      textareaRef.current.style.height = '136px'
      textareaRef.current.style.overflowY = 'auto'
    }
    setIsFocused(false)
  }

  const handleFocus = () => {
    adjustHeight()
    if (textareaRef.current) {
      textareaRef.current.style.overflowY = 'hidden'
    }
    setIsFocused(true)
  }

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        onInput={handleInput}
        onBlur={handleBlur}
        onFocus={handleFocus}
        id="textarea_body"
        name="body"
        defaultValue={defaultValue}
        rows={5}
        className="block w-full rounded-md border dark:border-gray-700 shadow-none px-3 py-2 text-gray-900 bg-gray-50 dark:text-gray-100 dark:bg-gray-800 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 resize-none"
        required
        onChange={onChange}
      />
      {!isFocused && lineCount > 6 && (
        <button
          className="absolute bottom-2.5 right-2.5 text-xs sm:text-sm bg-gray-100 dark:text-gray-100 dark:bg-gray-900 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-950 border"
          onClick={handleFocus}
        >
          全体表示
        </button>
      )}
    </div>
  )
}
