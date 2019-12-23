import React, { Component } from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../layouts/BaseLayout"
import SEO from "../components/seo"

export default class MDXPage extends Component {
  render() {
    const post = this.props.data.page

    return (
      <Layout className="Page">
        <SEO key={`seo-${post.fields.slug}`} postData={post} isBlogPost />
        <div as="article" id="Article">
          <MDXRenderer>{post.body}</MDXRenderer>
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  query PagePostQuery($id: String!) {
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
  }
`
