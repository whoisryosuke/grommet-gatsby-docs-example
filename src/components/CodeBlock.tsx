import React, { useState } from "react"
import styled from "styled-components"
import Highlight, { defaultProps } from "prism-react-renderer"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import { UIComponents } from "@layouts/Theme"
import theme from "prism-react-renderer/themes/nightOwlLight"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Box, Button, Heading } from "grommet"

const CodeBlockBox = styled(Box)`
  & pre {
    margin: 0;
    padding: 3em;
    overflow-x: auto;
  }
`

interface Props {}

export const CodeBlock: React.FC<Props> = ({ children, className, live }) => {
  const [copyStatus, setCopyStatus] = useState(false)
  const [codeVisibility, setCodeVisibility] = useState(false)
  const copyCode = () => {
    setCopyStatus(true)
    setTimeout(() => setCopyStatus(false), 3000)
  }
  const showCode = () => {
    setCodeVisibility(!codeVisibility)
  }
  const language = className && className.replace(/language-/, "")
  if (live) {
    return (
      <CodeBlockBox
        margin={{ vertical: "medium" }}
        pad={{ bottom: "large" }}
        border={{ side: "bottom", size: "xsmall", color: "gray" }}
      >
        <LiveProvider code={children} scope={UIComponents} theme={theme}>
          <Box direction="row" justify="between">
            <Box>
              <Heading level={4}>Example</Heading>
            </Box>
            <Box align="end">
              <Button
                onClick={showCode}
                label={`${codeVisibility ? "Hide" : "Show"} code`}
                color="light-6"
              />
              <CopyToClipboard text={children} onCopy={copyCode}>
                <i
                  data-content="Copy code"
                  aria-label="Copy code"
                  class="clipboard icon"
                ></i>
              </CopyToClipboard>
            </Box>
          </Box>
          <LivePreview />
          {codeVisibility && (
            <Box margin={{ vertical: "medium" }}>
              <LiveEditor />
            </Box>
          )}
          <LiveError />
        </LiveProvider>
      </CodeBlockBox>
    )
  }
  return (
    <CodeBlockBox margin={{ vertical: "medium" }}>
      <Highlight
        {...defaultProps}
        code={children}
        language={language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, padding: "20px" }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </CodeBlockBox>
  )
}

export default CodeBlock
