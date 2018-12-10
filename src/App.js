import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import FlowerShopScreenWrapper from './screens/FlowerShopScreenWrapper'
import MyOrdersScreenWrapper from './screens/MyOrdersScreenWrapper'
import PlaceOrderScreenWrapper from './screens/PlaceOrderScreenWrapper'
import UserInfoScreenWrapper from './screens/UserInfoScreenWrapper'

// screens
const userInfoScreen = () => (
  <UserInfoScreenWrapper />
)

const flowerShopScreen = () => (
  <FlowerShopScreenWrapper />
)

const placeOrderScreen = () => (
  <PlaceOrderScreenWrapper />
)

const myOrdersScreen = () => (
  <MyOrdersScreenWrapper />
)

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <div>
            <Link to='/user-info'>User info</Link>
          </div>
          <div>
            <Link to='/shops'>Flower shops</Link>
          </div>
          <div>
            <Link to='/place-order'>Place an order</Link>
          </div>
          <div>
            <Link to='/my-orders'>My orders</Link>
          </div>

          <Route path='/user-info' exact
            component={userInfoScreen}
          />
          <Route path='/shops' exact
            component={flowerShopScreen}
          />
          <Route path='/place-order' exact
            component={placeOrderScreen}
          />
          <Route path='/my-orders' exact
            component={myOrdersScreen}
          />
        </div>
      </Router>
    )
  }
}
