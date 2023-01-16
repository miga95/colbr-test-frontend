import React from 'react'
import '../styles/style.css'
import {Toaster} from 'react-hot-toast';

export default function MyApp({Component, pageProps}) {
  return (
    <div>
        <Component>{pageProps}</Component>
        <Toaster/>
    </div>
  )
}
