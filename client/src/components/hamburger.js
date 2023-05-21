import { Button } from 'antd'
import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'

export default function Hamburger({ onClick }) {
  return (
    <Button className='position-absolute m-2 shadow custom-hamburger' onClick={onClick} style={{zIndex: '1000', width: '60px', height: '60px'}}>
      <GiHamburgerMenu className='fs-3' />
    </Button>
  )
}
