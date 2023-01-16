import React from 'react'
import UserNav from '../components/UserNav'
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import Link from 'next/link';


export default function dashboard() {
  const cookies = useCookies();
  const [data, setdata] = useState();
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BASE_URL+'user',{
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+cookies[0].token

      }
      })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setdata(res.data)
      })
  }, []);
  return (
    <div className='main dashboard'>
      <UserNav/>
      <h1>Bonjour {data?.name}</h1>
      <div className='question1-container'>
        <h1>Question 1: Avez-vous des connaissances en Finance?</h1>
        <h1>Vous avez répondu: {data?.financial_knowledge==0 ?  'Non' : 'Oui'}</h1>
      </div>
      {data?.known_products.length > 0 ?
        <div className='question2-container'>
        <h1>Question 2: Quesl produits financiers connaissez-vous?</h1>
        <h1>Vous avez répondu: { data?.known_products.map((product) => product+', ')}</h1>
      </div> : null
      }
      
      <div className='return-loginpage-container'>
        <Link href='/auth/login'><button className='button-back' >Retour à la page de login</button></Link>
      </div>

    </div>
  )
}
