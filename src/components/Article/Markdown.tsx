import ReactMarkdown from 'react-markdown'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import RehypeHighlight from 'rehype-highlight'
import RemarkGfm from 'remark-gfm'

export default function Markdown({ markdown }: { markdown: string }) {
  return (
    <div className="my-10 overflow-hidden break-words rounded-md bg-slate-50 p-4 dark:bg-gray-900 sm:p-6 lg:p-8">
      <ReactMarkdown
        remarkPlugins={[RemarkGfm]}
        rehypePlugins={[RehypeHighlight]}
        className="prose max-w-none dark:prose-invert"
        components={{
          h1: ({ node, children }) => <h1 className="dark:border-gray-700">{children}</h1>,
          h2: ({ node, children }) => <h2 className="dark:border-gray-700">{children}</h2>,
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <>
                <span className="absolute left-0 top-0 w-full select-none rounded-t-md bg-gray-700 px-2 py-0.5 text-sm dark:bg-slate-800">
                  {match[1]}
                </span>
                <code className={className} {...props}>
                  {children}
                </code>
              </>
            ) : (
              <code className={`dark:bg-slate-700`} {...props}>
                {children}
              </code>
            )
          },
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
