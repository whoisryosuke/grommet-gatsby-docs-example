// @ts-check

/**
 * Since this file is shared with NetlifyCMS it must be .jsx
 */

import * as React from "react"
import * as grommet from "grommet"

import CodeBlock from "@components/CodeBlock"

export const UIComponents = {
  h1: props => <grommet.Heading level={1} {...props} />,
  h2: props => <grommet.Heading level={2} {...props} />,
  h3: props => <grommet.Heading level={3} {...props} />,
  h4: props => <grommet.Heading level={4} {...props} />,
  p: props => <grommet.Text {...props} />,
  hr: props => <grommet.Box as="hr" {...props} />,
  pre: props => <div {...props} />,
  code: CodeBlock,
  ...grommet,
}

export const Theme = ({ children, theme }) => (
  <grommet.Grommet theme={theme}>{children}</grommet.Grommet>
)
Theme.defaultProps = {
  theme: grommet.grommet,
}
