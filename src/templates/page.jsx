import React from 'react'
import { graphql } from "gatsby"

const SSRPage = ({ serverData }) => {
    return (
      <div>
        <h1>SSR Page with Dogs</h1>
        <img alt="Happy dog" src={serverData.message} />
      </div>
    )
}
  
export default SSRPage

export const query = graphql`
  query PageQuery {
    page: sanityPage {
      contentBlocks {
        ...Blocks
      }
    }
  }
`

export async function getServerData() {
  try {
    const res = await fetch(`https://dog.ceo/api/breeds/image/random`)
    if (!res.ok) {
      throw new Error(`Response failed`)
    }
    return {
      props: await res.json(),
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {}
    }
  }
}
