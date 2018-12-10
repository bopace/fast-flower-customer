import React from 'react'
import { ORDER_STATE } from '../constants'
import { updateOrder } from '../events'
import OrderSchema from '../schemas/OrderSchema'

export default class OrderAction extends React.PureComponent {
  static propTypes = {
    order: OrderSchema.isRequired,
  }

  render() {
    const { state } = this.props.order

    return (
      <div>
        <div>Status: <strong>{state}</strong></div>
        {this.renderAppropriateAction(state)}
      </div>
    )
  }

  renderAppropriateAction(status) {
    if (status === ORDER_STATE.PLACED) {
      return (
        <div>
          <div>Waiting to hear back from the shop. Sit tight.</div>
          <button onClick={this.cancelOrder}>
            Cancel order
          </button>
        </div>
      )
    }

    if (status === ORDER_STATE.REJECTED) {
      return (
        <div>The shop rejected the order. Bummer.</div>
      )
    }

    if (status === ORDER_STATE.ACCEPTED) {
      return (
        <div>The shop is preparing your delivery! Sit tight.</div>
      )
    }

    if (status === ORDER_STATE.OUT_FOR_DELIVERY) {
      return (
        <div>
          <div>Your flowers will be delivered shortly!</div>
          <button onClick={this.confirmDelivery}>
            My flowers have been delivered!
          </button>
        </div>
      )
    }
  }

  cancelOrder = () => {
    const { order } = this.props

    updateOrder(order, ORDER_STATE.CANCELLED)
  }

  confirmDelivery = () => {
    const { order } = this.props

    updateOrder(order, ORDER_STATE.DELIVERED)
  }
}
