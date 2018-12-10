import React from 'react'
import axios from 'axios'
import PlaceOrderScreen from './PlaceOrderScreen'
import { formatOrderData, formatShopData } from '../utils'

export default class PlaceOrderScreenWrapper extends React.PureComponent {
  state = {
    flowerShops: [],
    orders: [],
  }

  componentDidMount() {
    this.getShopsFromDb()
  }

  render() {
    const { flowerShops } = this.state
    return (
      <div>
        <PlaceOrderScreen
          flowerShops={flowerShops}
        />
      </div>
    )
  }

  getShopsFromDb = () => {
    fetch('/api/getShops')
      .then(data => data.json())
      .then(res => {
        const formattedData = formatShopData(res.data)
        this.setState({ flowerShops: formattedData })
      })
  }

  getOrdersFromDb = () => {
    fetch('/api/getOrders')
      .then(data => data.json())
      .then(res => {
        const formattedData = formatOrderData(res.data)
        this.setState({ orders: formattedData })
      })
  }

  placeOrder = order => {
    axios.post('/api/addOrder', {
      order: order
    }).then(() => this.getOrdersFromDb())
  }
}