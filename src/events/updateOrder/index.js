import axios from 'axios'
import uuid from 'uuid/v4'

export default function updateOrder(userInfo, order, newState) {
  const updatedOrder = {
    ...order,
    state: newState
  }

  const updateOrderEvent = {
    type: 'event',
    domain: 'order',
    id: uuid(),
    attrs: {
      customerName: userInfo.name,
      customerCell: userInfo.cellNumber,
      customerEventConsumer: userInfo.eventConsumer,
      order: updatedOrder
    }
  }

  // axios.post(order.shopUrl, {
  //   event: updateOrderEvent
  // })

  axios.post('/api/updateOrder', {
    id: order.id,
    update: { state: newState },
  })
}
