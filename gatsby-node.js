exports.createPages = ({ actions }) =>  {
  [1,2,3,4].forEach(id => {
    actions.createPage({
      path: `${id}`,
      component: require.resolve(`./src/templates/page.jsx`),
      defer: true
    })
  })
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  const typeDefs = `
    type SanityBifold implements ContentBlock {
      _type: String!
      _key: String!
    }
    
    type SanityCallToAction implements ContentBlock {
      _type: String!
      _key: String!
    }

    type SanityPage implements Node {
      contentBlocks: [ContentBlocks]
    }
  `

  const contentBlockInterface = schema.buildInterfaceType({
    name: `ContentBlock`,
    fields: {
      _type: `String!`,
      _key: `String!`,
    },
    resolveType: value => value._type,
  })

  const contentBlocksUnion = schema.buildUnionType({
    name: `ContentBlocks`,
    types: [`SanityBifold`, `SanityCallToAction`],
    resolveType: (value) => {
      if (value._type === `bifold`) {
        return `SanityBifold`
      } else {
        return `SanityCallToAction`
      }
    }
  })

  createTypes([contentBlockInterface, typeDefs, contentBlocksUnion])
}
