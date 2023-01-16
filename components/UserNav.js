import Image from 'next/image'
import React from 'react'
import logo from '../public/logo-colbr.svg'

export default function UserNav() {
  return (
    <nav className='userNav'>
      <Image src={logo} width={121} height={45} alt='logo' className='user-page-logo' ></Image>
    </nav>
  )
}
