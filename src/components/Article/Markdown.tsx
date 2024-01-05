import ReactMarkdown from 'react-markdown'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import RehypeHighlight from 'rehype-highlight'
import RemarkGfm from 'remark-gfm'

export default function Markdown({ markdown }: { markdown: string }) {
  return (
    <div className="my-10 p-4 sm:p-6 lg:p-8 overflow-clip break-words rounded-md bg-slate-50 dark:bg-gray-900">
      <ReactMarkdown
        remarkPlugins={[RemarkGfm]}
        rehypePlugins={[RehypeHighlight]}
        className="prose dark:prose-invert max-w-none"
        components={{
          h1: 'h2',
          h2: 'h3',
          h3: 'h4',
          h4: 'h5',
          h5: 'h6',

          em(props) {
            const { node, ...rest } = props
            return <i style={{ color: 'red' }} {...rest} />
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
