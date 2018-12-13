import axios from 'axios'
import uuid from 'uuid/v4'

export default function confirmDelivery(order) {
  const confirmDeliveryEvent = {
    type: 'event',
    domain: 'delivery',
    event: 'confirmed',
    id: uuid(),
    attrs: {
      delivery: {
        customerConfirmedDelivery: true,
        orderId: order.id,
      }
    }
  }

  return axios.post(order.shopUrl, {
    event: confirmDeliveryEvent
  })
}
