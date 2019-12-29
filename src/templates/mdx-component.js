import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Box, Heading } from "grommet"

import Layout from "@layouts/BaseLayout"
import SEO from "@components/seo"
import Page from "@components/Page"
import PropsTable from "@components/PropsTable/PropsTable"
import PageHeader from "@components/PageHeader"

const MDXPage = ({ data: { component, page } }) => {
  return (
    <Layout className="Page" title={page.frontmatter.title}>
      <SEO key={`seo-${page.fields.slug}`} postData={page} isBlogPost />
      <Page as="article" id="Component">
        <Box margin={{ bottom: "large" }} width="xlarge" alignSelf="center">
          <Box align="center">
            <PageHeader
              label={component.displayName || component.frontmatter.title}
              summary={component.docblock}
            />
          </Box>
          <Box>
            <MDXRenderer>{page.body}</MDXRenderer>

            <Box
              margin={{ vertical: "large" }}
              pad={{ top: "large" }}
              border={{ side: "top", size: "medium", color: "brand" }}
            >
              <Heading level={2}>Props:</Heading>
              <PropsTable propMetaData={component.childrenComponentProp} />
            </Box>
          </Box>
        </Box>
      </Page>
    </Layout>
  )
}

export const query = graphql`
  query ComponentPostQuery($id: String!, $name: String) {
    page: mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        section
      }
      body
      fields {
        slug
      }
    }
    component: componentMetadata(displayName: { eq: $name }) {
      id
      displayName
      docblock
      childrenComponentProp {
        name
        docblock
        required
        type {
          name
          value
        }
        defaultValue {
          value
        }
      }
    }
  }
`
export default MDXPage
