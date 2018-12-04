import React from 'react'
import { arrayOf, func } from 'prop-types'
import FlowerShopSchema from '../schemas/FlowerShopSchema'

export default class FlowerShopScreen extends React.PureComponent {
  static propTypes = {
    addShop: func.isRequired,
    flowerShops: arrayOf(FlowerShopSchema).isRequired,
  }

  state = {
    name: null,
    url: null,
  }

  render() {
    return (
      <div>
        {this.renderFlowerShops()}
        {this.renderAddShopForm()}
      </div>
    )
  }

  renderFlowerShops() {
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

  renderAddShopForm() {
    return (
      <div>
        <input
          type='text'
          onChange={this.updateName}
          placeholder='Shop name'
        />
        <input
          type='text'
          onChange={this.updateUrl}
          placeholder='Shop event URL'
        />
        <button onClick={this.addShop}>
          Add shop
        </button>
      </div>
    )
  }

  updateName = e => this.setState({ name: e.target.value })
  updateUrl = e => this.setState({ url: e.target.value })
  addShop = () => {
    const { name, url } = this.state
    this.setState({
      name: '',
      url: '',
    })
    this.props.addShop(name, url)
  }
}