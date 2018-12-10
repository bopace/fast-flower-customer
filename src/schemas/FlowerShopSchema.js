import { PropTypes } from 'react-schema'

const { shape, string } = PropTypes

export default shape({
  id: string.isRequired,
  name: string.isRequired,
  url: string.isRequired,
})
