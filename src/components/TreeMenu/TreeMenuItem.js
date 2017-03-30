import React, { Component } from 'react'
import styled from 'styled-components'
import TreeMenu from './TreeMenu'
import Chevron from './chevron'

const Title = styled.div`
  padding: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
`

const Link = styled.a`
  font-size: ${props => props.level < 2 ? '0.8' : '0.8'}em;
  font-weight: ${props => props.level < 2 ? '700' : '500'};
  padding: 0.6rem 1.5rem;
  padding-left: ${props => (props.level >= 1) ? 2.5 : 2}rem;
  color: white;
  text-decoration: none;
  line-height: 1;
  display: block;
  width: 100%;
  overflow: hidden;
`

const LinkText = styled.div`
  z-index: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
`

const MenuItem = styled.li`
  color: white;
  padding: 0;
  list-style: none;
  display: block;
  overflow: hidden;
  &:nth-child(odd) {
    background: rgba(255, 255, 255, 0.05);
  }
`

const MenuWrapper = styled.div`
  overflow: hidden;
  height: ${props => props.open ? 'auto' : '0'};
  overflow: hidden;
`

const Icon = styled.div`
  position: absolute;
  left: ${props => (props.level >= 1) ? '1.1' : '0.6'}rem;
`

export default class TreeMenuItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: props.open
    }
  }
  onClick = e => {
    this.setState({
      open: !this.state.open
    })
  }
  render() {
    const {name, items, level} = this.props
    return (
      <MenuItem level={level}>
        <Title onClick={this.onClick} level={level}>
          {items &&
          <Icon level={level}>
            <Chevron open={this.state.open}/>
          </Icon>}
          <Link level={level} href="#">
            <LinkText>{name}</LinkText>
          </Link>
        </Title>
        {items &&
        <MenuWrapper open={this.state.open}>
          <TreeMenu items={items} level={level + 1} open={this.state.open} />
        </MenuWrapper>}
      </MenuItem>
    )
  }
}

TreeMenuItem.defaultProps = {
  open: false
}
