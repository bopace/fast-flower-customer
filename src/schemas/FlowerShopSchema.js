import { PropTypes } from 'react-schema'

const { shape, string } = PropTypes

export default shape({
  name: string.isRequired,
  url: string.isRequired,
})