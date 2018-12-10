import axios from 'axios'
import uuid from 'uuid/v4'

export default function createOrder(order) {
  const createOrderEvent = {
    type: 'event',
    domain: 'order',
    id: uuid(),
    attrs: {
      order: order,
    }
  }

  axios.post(order.shopUrl, {
    event: createOrderEvent
  })

  axios.post('/api/addOrder', {
    order: order
  })
}
