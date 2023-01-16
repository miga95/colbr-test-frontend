import Link from 'next/link'
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';


import LoginNav from '../../components/LoginNav'


export default function register () {
    const [prenom, setPrenom] = useState();
    const [nom, setNom] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const inputContainer = useRef()
    const inputRef = useRef()
    const setOff = (e) => {
        if(e.target.value.length>0){
            e.target.parentElement.classList.remove('asterisk')
        }else{
            e.target.parentElement.classList.add('asterisk')
        }
    }

    const router = useRouter()
    const submitHandler = (e) => {
        e.preventDefault()
        fetch(process.env.NEXT_PUBLIC_BASE_URL+'register',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({lastname : nom, firstname: prenom, email: email, password: password })
        
        })
        .then((res) => res.json())
        .then((res) =>{
            console.log(res);
            if(res.success){
                toast.success('Ton compte a été crée')
                router.push('/auth/login')
            }else if(res.data === "23000"){
                toast.error("Cet Email est déjà enregistré ")
            }else{
                toast.error("Il y a une erreur dans la saisie")
            }
        })
    }
  return (
    <div className='main'>
        <LoginNav/>
        <div className='register-page-container'>
            <div className='title-div'>
                <h1>Création de ton espace Colbr</h1>
                <p> Déjà enrégistré? <Link href="/auth/login" className='login-link-button'>Connecte-toi ici</Link></p>
            </div>
            <div className='register-form-container'>
                <div className='input-container prenom asterisk ' ref={inputContainer}>
                    <input type="text" placeholder='Prénom' required onChange={(e) => setPrenom(e.target.value)} onInput={ (e) => setOff(e)} ref={inputRef}></input>
                </div>
                <div className='input-container nom asterisk '>
                    <input type="text" placeholder='Nom'  required onChange={(e) => setNom(e.target.value)} onInput={ (e) => setOff(e)} ref={inputRef}></input>
                </div>
                <div className='input-container email asterisk'>
                    <input type="email" placeholder='Email' required onChange={(e) => setEmail(e.target.value)} onInput={ (e) => setOff(e)}></input>
                </div>
                <label for='password' className='password-label'>Mot de passe<span className='asterisk'> *</span></label>
                <div className='input-container password'>
                    <input type="password" id='password'  className='password-input' required onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <button className='register-button' onClick={(e) => submitHandler(e)}><span className='register-button-text'>Création de mon espace</span></button>
            </div>
        </div>
    </div>
   
  )
}


