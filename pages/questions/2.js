import { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router'

import UserNav from '../../components/UserNav'


export default function question1 () {
    const [responses, setResponses] = useState([]);
    const cookies = useCookies()
    const buttonOuiRef = useRef();
    const buttonNonRef = useRef()

    const router = useRouter()

    const handleSelection = (e) => {
      if(!e.target.classList.value.includes("selected")){
        e.target.classList.add('selected')
        setResponses([...responses,e.target.innerText])        
      }else{
        e.target.classList.remove('selected')
        responses.map((response) => {
          setResponses(responses.filter(r => r.id !== response.id))
        })
      }
      
    }

    const submitHandler = () => {
        try {
            fetch(process.env.NEXT_PUBLIC_BASE_URL+'known-products',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+cookies[0].token
        
                },
                body: JSON.stringify({known_products: responses })
                })
                .then((res) => res.json())
                .then((res) => {
                    if (res.success) {
                      router.push('/questions/end')
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='main'>
        <UserNav/>
        <div className='question2-container'>
            <h1>Quels produits financiers connaissez-vous? </h1>
            <div className='response2-container'>
                <div className='background-container known-products'>
                    <button className='button-product' onClick={(e) => handleSelection(e, 1)} ref={buttonOuiRef}>Les Actions</button>
                </div>
                <div className='background-container known-products'>
                    <button className='button-product' onClick={(e) => handleSelection(e, 2)} ref={buttonNonRef}>Les Obligations</button>
                </div>
                <div className='background-container known-products'>
                    <button className='button-product' onClick={(e) => handleSelection(e, 3)} ref={buttonNonRef}>Les Produits Dérivés</button>
                </div>
            </div>
        </div>
            
        <div className='bottom-container question2'>
            <div className='action-buttons-container'>
                <div className='background-container'>
                    <button className='button-cancel'  >Annuler</button>
                </div>
                <div className='background-container'>
                    <button className='button-continue' onClick={(e) => submitHandler()} >Continuer</button>
                </div>
            </div>
        </div>

        
    </div>
   
  )
}


