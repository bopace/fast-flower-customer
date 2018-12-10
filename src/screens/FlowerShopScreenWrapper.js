import React from 'react'
import axios from 'axios'
import FlowerShopScreen from './FlowerShopScreen'
import { formatShopData } from '../utils'

export default class FlowerShopScreenWrapper extends React.PureComponent {
  state = {
    flowerShops: [],
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
          deleteShop={this.deleteShopFromDB}
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

  addShopToDb = (name, url) => {
    axios.post('/api/addShop', {
      name: name,
      url: url,
    }).then(() => this.getShopsFromDb())
  }

  deleteShopFromDB = id => {
    axios.delete('/api/deleteShop', {
      data: {
        id: id
      }
    }).then(() => this.getShopsFromDb())
  }
}
