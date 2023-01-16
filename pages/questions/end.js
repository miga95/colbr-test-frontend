
import Link from 'next/link'
import UserNav from '../../components/UserNav'


export default function question1 () {


 

  return (
    <div className='main'>
        <UserNav/>
        <div className='end-container'>
          <h1>Merci pour votre participation !</h1>
          <div className='end-background-container'>
            <Link href='/auth/login'><button className='button-back' >Retour à la page de login</button></Link>
          </div>
        </div>
    </>
   
  )
}


