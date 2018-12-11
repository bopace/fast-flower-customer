import React from 'react'
import { object } from 'prop-types'
import PlaceOrderScreen from './PlaceOrderScreen'
import { formatShopData } from '../utils'
import { createOrder } from '../events'

export default class PlaceOrderScreenWrapper extends React.PureComponent {
  static propTypes = {
    history: object.isRequired,
  }

  state = {
    flowerShops: [],
    userInfo: {},
  }

  componentDidMount() {
    this.getShopsFromDb()
    this.getUserInfoFromDb()
  }

  render() {
    const { flowerShops, userInfo } = this.state
    return (
      <PlaceOrderScreen
        flowerShops={flowerShops}
        placeOrder={this.placeOrder}
        userInfo={userInfo}
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

  getUserInfoFromDb = () => {
    fetch('/api/getUserInfo')
      .then(data => data.json())
      .then(res => {
        this.setState({ userInfo: res.data[0] })
      })
  }

  placeOrder = order => {
    createOrder(order)
    this.props.history.push('/my-orders')
  }
}
