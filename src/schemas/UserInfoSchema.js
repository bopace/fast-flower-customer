import { PropTypes } from 'react-schema'

const { shape, string } = PropTypes

export default shape({
  name: string.isRequired,
  address: string.isRequired,
  cellNumber: string.isRequired,
  eventConsumer: string.isRequired,
})
