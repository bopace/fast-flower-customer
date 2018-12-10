import React from 'react'
import { func, string } from 'prop-types'

export default class FlowerShop extends React.PureComponent {
  static propTypes = {
    onDelete: func.isRequired,
    shopId: string.isRequired,
    shopName: string.isRequired,
    shopUrl: string.isRequired,
  }

  render() {
    const { shopName, shopUrl } = this.props
    return (
      <div>
        <div>{shopName}</div>
        <div>{shopUrl}</div>
        <button onClick={this.deleteShop}>
          Delete shop
        </button>
      </div>
    )
  }

  deleteShop = () => {
    const { onDelete, shopId } = this.props
    onDelete(shopId)
  }
}
