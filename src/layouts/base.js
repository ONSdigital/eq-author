import React from 'react'

import TopBar from '../components/TopBar'

const BaseLayout = (props) => (
    <div>
      <TopBar />
      {props.children}
    </div>
)

export default BaseLayout
