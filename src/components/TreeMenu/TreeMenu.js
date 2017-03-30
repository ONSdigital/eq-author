import React from 'react'
import styled from 'styled-components'
import TreeMenuItem from './TreeMenuItem'
import AddButton from 'components/AddButton'

const List = styled.ul`
  color: white;
  font-size: 1em;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
`

const Button = styled.div`
  margin: 0.5em;
`

const TreeMenu = ({items, open = true, level = 0}) =>
  <List>
    {
      items.length > 0
      ? items.map((item, index) =>
        <TreeMenuItem {...item} key={index} level={level} open={open} />)
      : <Button>
          <AddButton editLabel="Section name">Add a section</AddButton>
        </Button>
    }
  </List>

export default TreeMenu
