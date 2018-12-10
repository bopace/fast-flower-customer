import React from 'react'
import MyOrdersScreen from './MyOrdersScreen'

export default class MyOrdersScreenWrapper extends React.PureComponent {
  state = {
    orders: [],
    userInfo: {},
  }

  componentDidMount() {
    this.getOrdersFromDb()
    this.getUserInfoFromDb()
  }

  render() {
    const { orders, userInfo } = this.state
    return (
      <MyOrdersScreen
        orders={orders}
        userInfo={userInfo}
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

  getUserInfoFromDb = () => {
    fetch('/api/getUserInfo')
      .then(data => data.json())
      .then(res => {
        this.setState({ userInfo: res.data[0] })
      })
  }
}
