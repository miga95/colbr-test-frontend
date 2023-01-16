import Image from 'next/image'
import React from 'react'
import logo from '../public/logo-colbr.svg'

export default function LoginNav() {
  return (
    <nav className='login-nav'>
      <Image src={logo} width={121} height={45} className='login-page-logo'></Image>
    </nav>
  )
}
