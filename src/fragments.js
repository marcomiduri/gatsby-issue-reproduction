import { graphql } from "gatsby"

export const fragments = graphql`
  fragment ContentBlockBase on ContentBlock {
    _type
    _key
  }
`
