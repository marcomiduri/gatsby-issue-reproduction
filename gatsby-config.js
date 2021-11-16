require("dotenv").config()

module.exports = {
    siteMetadata: {
        siteUrl: `https://www.yourdomain.tld`,
    },
    plugins: [
      `gatsby-plugin-image`,
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      process.env.SANITY_PROJECT_ID && {
        resolve: "gatsby-source-sanity",
        options: {
          projectId: process.env.SANITY_PROJECT_ID,
          dataset: process.env.SANITY_DATASET,
          token: process.env.SANITY_TOKEN,
          overlayDrafts: process.env.SHOW_DRAFTS === "true",
          watchMode: process.env.NODE_ENV !== "production",
        },
      },
    ]
}
