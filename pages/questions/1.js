import { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router'

import UserNav from '../../components/UserNav'


export default function question1 () {
    const [response, setResponse] = useState();
    const cookies = useCookies()
    const buttonOuiRef = useRef();
    const buttonNonRef = useRef()

    const router = useRouter()

    const handleSelection = (e) => {
        e.target.style.backgroundColor='transparent'
        if(e.target.innerText === "Oui"){
            buttonNonRef.current.style.backgroundColor="#1C1E33";
            setResponse(true);
        }else{
            buttonOuiRef.current.style.backgroundColor="#1C1E33";
            setResponse(false);
        }
    }

    const submitHandler = () => {
        try {
            fetch(process.env.NEXT_PUBLIC_BASE_URL+'financial-knowledge',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+cookies[0].token
        
                },
                body: JSON.stringify({financial_knowledge: response })
                })
                .then((res) => res.json())
                .then((res) => {
                    if(res.data.financial_knowledge == false){
                        router.push('/questions/end')
                    }else{
                        router.push('/questions/2')
                    }
                })
        } catch (error) {
            console.log(error)
        }
        
        
        
    }
  return (
    <div className='main'>
        <UserNav/>
        <div className='question-container'>
            <h1>Avez-vous des connaissances en finance?</h1>
            <div className='response-container'>
                <div className='background-container'>
                    <button className='button-oui' onClick={(e) => handleSelection(e)} ref={buttonOuiRef}>Oui</button>
                </div>
                <div className='background-container'>
                    <button className='button-non' onClick={(e) => handleSelection(e)} ref={buttonNonRef}>Non</button>
                </div>
            </div>
        </div>
            
        <div className='bottom-container'>
            <div className='action-buttons-container'>
                <div className='background-container'>
                    <button className='button-cancel'>Annuler</button>
                </div>
                <div className='background-container'>
                    <button className='button-continue' onClick={(e) => submitHandler()} >Continuer</button>
                </div>
            </div>
        </div>

        
    </div>
   
  )
}


