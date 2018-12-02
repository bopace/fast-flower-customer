import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'
import FlowerShopScreenWrapper from './screens/FlowerShopScreenWrapper'

// screens
const flowerShopScreen = () => (
  <FlowerShopScreenWrapper />
)

const placeOrderScreen = () => (
  <div>Coming soon!</div>
)

const myOrdersScreen = () => (
  <div>Coming soon!</div>
)

export default class App extends Component {
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  }

  componentDidMount() {
    this.getDataFromDb()
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000)
      this.setState({ intervalIsSet: interval })
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet)
      this.setState({ intervalIsSet: null })
    }
  }

  render() {
    return (
      <Router>
        <div>
          <FlowerShopScreenWrapper />
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

  getDataFromDb = () => {
    fetch('/api/getData')
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }))
  }

  putDataToDB = message => {
    let currentIds = this.state.data.map(data => data.id)
    let idToBeAdded = 0
    while (currentIds.includes(idToBeAdded)) {
      idToBeAdded++
    }

    axios.post('/api/putData', {
      id: idToBeAdded,
      message: message
    })
  }

  deleteFromDB = idToDelete => {
    let objIdToDelete = null
    this.state.data.forEach(dat => {
      if (dat.id === idToDelete) {
        objIdToDelete = dat._id
      }
    })

    axios.delete('/api/deleteData', {
      data: {
        id: objIdToDelete
      }
    })
  }

  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null
    this.state.data.forEach(dat => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id
      }
    })

    axios.post('/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply }
    })
  }
}

export default App;