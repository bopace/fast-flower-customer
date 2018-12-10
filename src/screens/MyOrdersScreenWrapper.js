import React from 'react'
import MyOrdersScreen from './MyOrdersScreen'

export default class MyOrdersScreenWrapper extends React.PureComponent {
  state = {
    orders: [],
  }

  componentDidMount() {
    this.getOrdersFromDb()
  }

  render() {
    const { orders } = this.state
    return (
      <MyOrdersScreen
        orders={orders}
      />
    )
  }

  getOrdersFromDb = () => {
    fetch('/api/getOrders')
      .then(data => data.json())
      .then(res => {
        this.setState({ orders: res.data })
      })
  }
}