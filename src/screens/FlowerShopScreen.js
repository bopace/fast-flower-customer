import React from 'react'
import { arrayOf } from 'prop-types'
import FlowerShopSchema from '../schemas/FlowerShopSchema'

export default class FlowerShopScreen extends React.PureComponent {
  static propTypes = {
    flowerShops: arrayOf(FlowerShopSchema).isRequired
  }

  render() {
    const { flowerShops } = this.props

    if (flowerShops.length === 0) {
      return (
        <div>No flower shops... yet</div>
      )
    }

    return (
      <div>
        {flowerShops.map(shop => (
          <div>
            {shop.name}, {shop.url}
          </div>
        ))}
      </div>
    )
  }
}