const path = require(`path`)

// Create a slug for each recipe and set it as a field on the node.
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  // console.log(JSON.stringify(node.internal));
  if (node.internal.type === `node__recipe`) {
    const slug = `/recipes/${node.path.alias}/`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const recipeTemplate = path.resolve(`src/templates/recipe.js`)
  // Query for recipe nodes to use in creating pages.
  return graphql(
    `
      {
        allNodeRecipe {
          edges {
            node {
              drupal_internal__nid
              path {
                alias
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create pages for each recipe.
    result.data.allNodeRecipe.edges.forEach(({ node }) => {
      createPage({
        path: node.path.alias,
        component: recipeTemplate,
        context: {
          slug: node.path.alias,
        },
      })
    })
  })
}
