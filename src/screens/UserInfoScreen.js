import React from 'react'
import { func } from 'prop-types'
import UserInfoSchema from '../schemas/UserInfoSchema'

export default class UserInfoScreen extends React.PureComponent {
  static propTypes = {
    userInfo: UserInfoSchema.isRequired,
    updateUserInfo: func.isRequired,
  }

  state = {
    name: '',
    address: '',
    cellNumber: '',
    eventConsumer: '',
  }

  render() {
    const { userInfo } = this.props

    return (
      <div>
        <h1>Edit user info</h1>
        <div>
          <input
            type='text'
            onChange={this.updateName}
            placeholder={userInfo.name}
            value={this.state.name}
          />
        </div>
        <div>
          <textarea
            onChange={this.updateAddress}
            placeholder={userInfo.address}
            value={this.state.address}
          />
        </div>
        <div>
          <input
            type='text'
            onChange={this.updateCellNumber}
            placeholder={userInfo.cellNumber}
            value={this.state.cellNumber}
          />
        </div>
        <div>
          <input
            type='text'
            onChange={this.updateEventConsumer}
            placeholder={userInfo.eventConsumer}
            value={this.state.eventConsumer}
          />
        </div>
        <button onClick={this.onUpdate}>
          Update info
        </button>
      </div>
    )
  }

  updateName = e => this.setState({ name: e.target.value })
  updateAddress = e => this.setState({ address: e.target.value })
  updateCellNumber = e => this.setState({ cellNumber: e.target.value })
  updateEventConsumer = e => this.setState({ eventConsumer: e.target.value })

  onUpdate = () => {
    const { name, address, cellNumber, eventConsumer } = this.state
    const update = {
      name: name,
      address: address,
      cellNumber: cellNumber,
      eventConsumer: eventConsumer
    }

    this.props.updateUserInfo(update)
  }
}
