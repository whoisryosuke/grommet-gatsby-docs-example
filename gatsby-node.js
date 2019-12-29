/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const createPaginatedPages = require("gatsby-paginate")
const slugify = require("slugify")

/**
 * Custom Webpack config
 *
 * Adds aliases for paths (like components)
 * so you don't get lost in relative hell -> '../../../'
 */
exports.onCreateWebpackConfig = ({ config, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@components": path.join(__dirname, "./src/components"),
        "@assets": path.join(__dirname, "./src/assets"),
        "@helpers": path.join(__dirname, "./src/helpers"),
        "@layouts": path.join(__dirname, "./src/layouts"),
        "@templates": path.join(__dirname, "./src/templates"),
      },
    },
  })
}

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === "Mdx") {
    const {
      frontmatter: { title, section },
    } = node
    let newNode = {
      name: "slug",
      node,
    }

    /**
     * If we define a section, categorize page there
     */
    if (section) {
      newNode.value = `${slugify(section.toLowerCase())}/${slugify(
        title.toLowerCase()
      )}`
    } else {
      newNode.value = createFilePath({ node, getNode, basePath: `pages` })
    }
    createNodeField(newNode)
  }
}

/**
 * Pagination for all MDX posts
 *
 * @param {string} section
 * @param {string} prefix
 * @param {*} graphql
 * @param {*} createPage
 */
async function createMdxPagination(
  section,
  prefix,
  graphql,
  createPage,
  reporter
) {
  const result = await graphql(`
      {
        allMdx(
            sort: {fields: [name], order: DESC}, 
            filter:{frontmatter:{section:{eq: "${section}"}}}
        ) {
            totalCount
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date(formatString: "DD MMMM, YYYY")
                        section
                        tags
                    }
                    fields {
                        slug
                    }
                }
            }
        }
      }
    `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
    console.log("🚨  ERROR:", result.errors)
  }

  createPaginatedPages({
    edges: result.data.allMdx.edges,
    createPage: createPage,
    pageTemplate: "src/templates/blog-archive.js",
    pageLength: 6,
    pathPrefix: prefix,
    buildPath: (index, pathPrefix) =>
      index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}`, // This is optional and this is the default
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx(filter: { frontmatter: { title: { ne: "" } } }) {
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
  `)
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }
  // Create blog post pages.
  const posts = result.data.allMdx.edges
  // We'll call `createPage` for each result
  posts.forEach(({ node }, index) => {
    // Page object for page creation
    let pendingPage = {
      // This is the slug we created before
      // (or `node.frontmatter.slug`)
      path: node.fields.slug,
      // This component will wrap our MDX content
      component: path.resolve(`./src/templates/mdx-component.js`),
      // We can use the values in this context in
      // our page layout component
      context: { id: node.id, name: node.frontmatter.title },
    }

    // Change page template based on section
    if (node.frontmatter.section == "page") {
      pendingPage.component = path.resolve(`./src/templates/mdx-page.js`)
    }

    createPage(pendingPage)
  })

  // Create pagination archive pages
  //   await createMdxPagination("blog", "blog", graphql, createPage, reporter)
}
