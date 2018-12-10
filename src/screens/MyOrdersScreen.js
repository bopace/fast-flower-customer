import React from 'react'
import { arrayOf } from 'prop-types'
import OrderSchema from '../schemas/OrderSchema'
import Order from '../components/Order'

export default class MyOrdersScreen extends React.PureComponent {
  static propTypes = {
    orders: arrayOf(OrderSchema).isRequired,
  }

  render() {
    return (
      <div>
        {this.renderOrders()}
      </div>
    )
  }

  renderOrders() {
    const { orders } = this.props

    if (orders.length === 0) {
      return (
        <h1>No orders... yet</h1>
      )
    }

    return (
      <div>
        <h1>Orders</h1>
        {orders.map(order => (
          <Order order={order} />
        ))}
      </div>
    )
  }
}
