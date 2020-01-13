import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Box, Button, Text, Anchor } from "grommet"

interface Props {}

const Sidebar: React.FC<Props> = () => {
  return (
    <StaticQuery
      query={graphql`
        query SidebarQuery {
          pages: allMdx(filter: { frontmatter: { title: { ne: "" } } }) {
            edges {
              node {
                id
                frontmatter {
                  title
                  section
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `}
      render={data => {
        const nav = data.pages.edges.map(({ node }) => (
          <Anchor
            key={node.frontmatter.title}
            href={node.frontmatter.slug}
            color="dark-3"
          >
            <Box pad={{ horizontal: "medium", vertical: "small" }}>
              <Text>{node.frontmatter.title}</Text>
            </Box>
          </Anchor>
        ))
        return nav
      }}
    />
  )
}

export default Sidebar
