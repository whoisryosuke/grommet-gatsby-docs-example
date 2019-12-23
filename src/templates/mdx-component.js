import React, { Component } from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../layouts/BaseLayout"
import SEO from "../components/seo"
import PropsTable from "../components/PropsTable/PropsTable"

export default class MDXPage extends Component {
  render() {
    const { component, page } = this.props.data
    console.log("component", this.props.data)

    return (
      <Layout className="Page">
        <SEO key={`seo-${page.fields.slug}`} postData={page} isBlogPost />
        <div as="article" id="Component">
          <h1>{component.displayName}</h1>
          <p>{component.docblock}</p>
          <MDXRenderer>{page.body}</MDXRenderer>
          <h2 style={{ marginTop: "2rem" }}>Props:</h2>
          <PropsTable propMetaData={component.childrenComponentProp} />
        </div>
      </Layout>
    )
  }
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
      doclets
      childrenComponentProp {
        name
        docblock
        required
        parentType {
          name
        }
        type {
          value
        }
        defaultValue {
          value
          computed
        }
      }
      composes
    }
  }
`
