import React from 'react'
import { arrayOf, func } from 'prop-types'
import uuid from 'uuid/v4'
import FlowerShopSchema from '../schemas/FlowerShopSchema'
import { ORDER_STATE } from '../constants'

export default class PlaceOrderScreen extends React.PureComponent {
  static propTypes = {
    flowerShops: arrayOf(FlowerShopSchema).isRequired,
    placeOrder: func.isRequired,
  }

  state = {
    chosenFlowerShopId: null,
    items: [],
    itemName: '',
    itemQuantity: '',
    specialInstructions: '',
  }

  render() {
    const { flowerShops } = this.props

    if (flowerShops.length === 0) {
      return (
        <h2>No shops to order from... yet!</h2>
      )
    }

    return (
      <div>
        <h1>Place an Order</h1>
        {this.renderFlowerShopDropdown(flowerShops)}
        {this.renderItemForm()}

        <br />
        <br />
        <button onClick={this.placeOrder}>
          Place order!
        </button>
      </div>
    )
  }

  renderFlowerShopDropdown(flowerShops) {
    return (
      <div>
        <h2>Shop</h2>
        <select onChange={this.updateShopId}>
          <option value="" selected disabled hidden>Select a shop</option>
          {flowerShops.map(this.renderFlowerShopDropdownItem)}
        </select>
      </div>
    )
  }

  renderFlowerShopDropdownItem(flowerShop) {
    return (
      <option value={flowerShop.id}>
        {flowerShop.name}
      </option>
    )
  }

  renderItemForm() {
    const { items } = this.state
    return (
      <div>
        <h2>Items</h2>
        {items && this.renderItemList(items)}
        {this.renderItemSelection()}
        {this.renderSpecialInstructions()}
      </div>
    )
  }

  renderItemList(items) {
    return (
      <ul>
        {items.map(item => (
          <li>
            {item.name}: {item.quantity}
          </li>
        ))}
      </ul>
    )
  }

  renderItemSelection() {
    return (
      <div>
        <input
          type='text'
          onChange={this.updateItemName}
          placeholder='Item name'
          value={this.state.itemName}
        />
        <input
          type='text'
          onChange={this.updateItemQuantity}
          placeholder='Item quantity'
          value={this.state.itemQuantity}
        />
        <button onClick={this.addItemToOrder}>
          Add item
        </button>
      </div>
    )
  }

  renderSpecialInstructions() {
    return (
      <div>
        <h2>Any special delivery instructions?</h2>
        <textarea
          onChange={this.updateSpecialInstructions}
          placeholder='Special instructions'
          value={this.state.specialInstructions}
        />
      </div>
    )
  }

  updateShopId = e => this.setState({ chosenFlowerShopId: e.target.value })
  updateItemName = e => this.setState({ itemName: e.target.value })
  updateItemQuantity = e => this.setState({ itemQuantity: e.target.value })
  updateSpecialInstructions = e => this.setState({ specialInstructions: e.target.value })

  addItemToOrder = () => {
    const { itemName, itemQuantity } = this.state
    const newItem = {
      name: itemName,
      quantity: itemQuantity
    }
    this.setState(prevState => ({
      items: [...prevState.items, newItem],
      itemName: '',
      itemQuantity: '',
    }))
  }

  placeOrder = () => {
    const { flowerShops } = this.props
    const { chosenFlowerShopId, items, specialInstructions } = this.state
    const chosenFlowerShop = flowerShops.find(shop => shop.id === chosenFlowerShopId)
    const myOrder = {
      id: uuid(),
      state: ORDER_STATE.PLACED,
      items: items,
      specialInstructions: specialInstructions,
      shopId: chosenFlowerShop.id,
      shopName: chosenFlowerShop.name,
      shopUrl: chosenFlowerShop.url,
    }

    this.props.placeOrder(myOrder)
  }
}
