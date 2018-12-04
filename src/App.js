import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import FlowerShopScreenWrapper from './screens/FlowerShopScreenWrapper'

// screens
const flowerShopScreen = shops => (
  <FlowerShopScreenWrapper />
)

const placeOrderScreen = () => (
  <div>Coming soon!</div>
)

const myOrdersScreen = () => (
  <div>Coming soon!</div>
)

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div>
            <Link to='/shops'>Flower shops</Link>
          </div>
          <div>
            <Link to='/place-order'>Place an order</Link>
          </div>
          <div>
            <Link to='/my-orders'>My orders</Link>
          </div>

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

  renderASDF() {
    const { data } = this.state
    return (
      <div>
        <ul>
          {data.length <= 0
            ? "NO DB ENTRIES YET"
            : data.map(dat => (
                <li style={{ padding: "10px" }} key={data.message}>
                  <span style={{ color: "gray" }}> id: </span> {dat.id} <br />
                  <span style={{ color: "gray" }}> data: </span>
                  {dat.message}
                </li>
              ))}
        </ul>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            onChange={e => this.setState({ message: e.target.value })}
            placeholder="add something in the database"
            style={{ width: "200px" }}
          />
          <button onClick={() => this.putDataToDB(this.state.message)}>
            ADD
          </button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
        </div>
      </div>
    )
  }
}
