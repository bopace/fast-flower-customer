import React from 'react'
import axios from 'axios'
import PlaceOrderScreen from './PlaceOrderScreen'
import { formatShopData } from '../utils'

export default class PlaceOrderScreenWrapper extends React.PureComponent {
  state = {
    flowerShops: [],
  }

  componentDidMount() {
    this.getShopsFromDb()
  }

  render() {
    const { flowerShops } = this.state
    return (
      <PlaceOrderScreen
        flowerShops={flowerShops}
        placeOrder={this.placeOrder}
      />
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

  placeOrder = order => {
    axios.post('/api/addOrder', {
      order: order
    })
  }
}
