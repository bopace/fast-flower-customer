import React from 'react'
import OrderSchema from '../schemas/OrderSchema'
import OrderAction from './OrderAction'

export default class Order extends React.PureComponent {
  static propTypes = {
    order: OrderSchema.isRequired,
  }

  render() {
    const { order } = this.props
    return (
      <div>
        <h2>Order: {order.id}</h2>
        <div>Placed to: <strong>{order.shopName}</strong></div>
        <div>Items ordered:</div>
        {this.renderItems(order.items)}
        <OrderAction order={order} />
      </div>
    )
  }

  renderItems(items) {
    if (items.length === 0) {
      return (
        <div>No items in this order. Seems like a waste of money to me...</div>
      )
    }
    return (
      <ul>
        {items.map(item => (
          <li><strong>{item.name}</strong>, quantity: <strong>{item.quantity}</strong></li>
        ))}
      </ul>
    )
  }
}
