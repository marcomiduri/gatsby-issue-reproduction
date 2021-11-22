exports.createPages = ({ actions }) =>  {
  [1,2,3,4].forEach(id => {
    actions.createPage({
      path: `${id}`,
      component: require.resolve(`./src/templates/page.jsx`),
      defer: true
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
    interface ContentBlock {
      _type: String!
      _key: String!
    }
    
    type SanityBifold implements ContentBlock {
      _type: String!
      _key: String!
    }
    
    type SanityCallToAction implements ContentBlock {
      _type: String!
      _key: String!
    }
    
    # Define a union of all content block types
    union ContentBlocks =
        SanityBifold
      | SanityCallToAction
    
    type SanityPage implements Node {
      contentBlocks: [ContentBlocks]
    }
  `
  createTypes(typeDefs)
}
