const fs = require("fs")
const path = require("path")

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

  const typeDefs = fs.readFileSync(
    path.resolve(__dirname, "schema.graphql"),
    "utf8"
  )
  createTypes(typeDefs)
}
