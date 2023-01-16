import Link from 'next/link'
import LoginNav from '../../components/LoginNav'
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';


export default function login () {
    const [cookies, setCookie] = useCookies(['name']);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const router = useRouter()
    const submitHandler = () => {
        fetch(process.env.NEXT_PUBLIC_BASE_URL+'login',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email: email, password: password })
        
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.data.error){
                toast.error("Identifiants incorrect")
            }else if(res.success){
                console.log(res);
                toast.success("Connecté")
                setCookie("token", res.data.token)
                res.data.financial_knowledge!==null ? router.push("/dashboard") : router.push("/questions/1") 
            }            
        })
    }
  return (
    <div className='main'>
        <LoginNav/>
        <div className='register-page-container'>
            <div className='title-div'>
                <h1>Accès à ton espace Colbr</h1>
                <p>Pas de compte? <Link href="/auth/register" className='login-link-button'>Enregistre-toi ici</Link></p>
            </div>
            <div className='login-form-container'>
                <label className='email-label'>
                    <div className='input-container'>
                        <input type="email" className='input-email' placeholder='Entre votre adresse email' required onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                </label>
                <label for='password' className='password-label'>Mot de passe<span className='asterisk'> *</span></label>
                <div className='input-container password'>
                    <input type="password" id='password'  className='password-input' required onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <button className='register-button' onClick={submitHandler}><span className='register-button-text' >Login</span></button>
            </div>
        </div>
    </div>
   
  )
}


