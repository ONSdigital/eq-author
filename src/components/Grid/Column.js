
import styled from 'styled-components'

const Column = styled.div`
  flex: 1 1 auto;
  padding: 0 0.5em;
  max-width: ${({cols}) => cols / 12 * 100}%;
`

export default Column
