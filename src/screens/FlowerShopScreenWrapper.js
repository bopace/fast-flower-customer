import React from 'react'
import FlowerShopScreen from './FlowerShopScreen'

export default class FlowerShopScreenWrapper extends React.PureComponent {
  render() {
    const flowerShops = [
      {
        name: 'Flower Shop 1',
        url: 'https://asoidjfaoisdjf'
      },
      {
        name: 'Flower Shop 2',
        url: 'https://asoidjfaoisdjf'
      },
      {
        name: 'Flower Shop 3',
        url: 'https://asoidjfaoisdjf'
      },
    ]

    return (
      <div>
        <FlowerShopScreen
          flowerShops={flowerShops}
        />
      </div>
    )
  }
}