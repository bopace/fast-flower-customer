import React from 'react'
import axios from 'axios'
import FlowerShopScreen from './FlowerShopScreen'

export default class FlowerShopScreenWrapper extends React.PureComponent {
  state = {
    flowerShops: [],
    id: 0,
    message: null,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  }

  componentDidMount() {
    this.getShopsFromDb()
  }

  render() {
    const { flowerShops } = this.state
    return (
      <div>
        <FlowerShopScreen
          addShop={this.addShopToDb}
          flowerShops={flowerShops}
        />
      </div>
    )
  }

  getShopsFromDb = () => {
    fetch('/api/getShops')
      .then(data => data.json())
      .then(res => {
        console.log('the data: ', res.data)
        this.setState({ flowerShops: res.data })
      })
  }

  addShopToDb = (name, url) => {
    axios.post('/api/addShop', {
      name: name,
      url: url,
    }).then(() => this.getShopsFromDb())
  }

  deleteShopFromDB = idToDelete => {
    let shopIdToDelete = null
    this.state.data.forEach(dat => {
      if (dat.id === idToDelete) {
        shopIdToDelete = dat._id
      }
    })

    axios.delete('/api/deleteShop', {
      data: {
        id: shopIdToDelete
      }
    }).then(() => this.getShopsFromDb())
  }
}