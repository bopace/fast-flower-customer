import React from 'react'
import axios from 'axios'
import UserInfoScreen from './UserInfoScreen'

export default class UserInfoScreenWrapper extends React.PureComponent {
  state = {
    userInfo: {},
  }

  componentDidMount() {
    this.getUserInfoFromDb()
  }

  render() {
    const { userInfo } = this.state
    return (
      <UserInfoScreen
        userInfo={userInfo}
        updateUserInfo={this.updateUserInfo}
      />
    )
  }

  getUserInfoFromDb = () => {
    fetch('/api/getUserInfo')
      .then(data => data.json())
      .then(res => {
        this.setState({ userInfo: res.data[0] })
      })
  }

  updateUserInfo = userInfo => {
    axios.post('/api/updateUserInfo', {
      update: userInfo
    })
  }
}
