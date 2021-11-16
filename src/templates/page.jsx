import React from 'react'

const SSRPage = ({ serverData }) => {
    return (
      <div>
        <h1>SSR Page with Dogs</h1>
        <img alt="Happy dog" src={serverData.message} />
      </div>
    )
}
  
export default SSRPage

export async function getServerData(context) {
  try {
    const { shopifyProductId } = context.pageContext
    const yotpoKey = process.env.YOTPO_API_KEY

    if (shopifyProductId && yotpoKey) {
      const config = {
        method: "get",
        url: `https://api.yotpo.com/v1/widget/${yotpoKey}/products/${shopifyProductId}/bottomline`,
      }
      const response = await axios(config)

      if (response.status === 200)
        return {
          props: { reviews: response.data.response.bottomline },
        }
    }

    throw new Error(`Response failed`)
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}
