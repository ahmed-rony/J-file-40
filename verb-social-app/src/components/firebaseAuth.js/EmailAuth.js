import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebase.config';
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
// import { onAuthStateChanged } from "firebase/auth";


firebase.initializeApp(firebaseConfig);

const EmailAuth = () => {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const auth = getAuth();
    // const [userInfo, setUserInfo] = useState({});

    // onAuthStateChanged(auth, (currentUser) =>{
    //     setUserInfo(currentUser);
    //     // console.log(userInfo);
    // })

    const register = async () =>{
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            // console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    }

    const login = async () =>{
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    }

    const logout = async () =>{
        await signOut(auth);
    }
    return (
        <div>
            <div style={{margin:'50px 0'}}>
                <h2  style={{marginBottom:'30px'}}>Register User</h2>
                <input 
                    type="email" 
                    placeholder='Email' 
                    onChange={(event) =>{
                        setRegisterEmail(event.target.value)}
                    } />

                <input type="password" placeholder='Password' onChange={(event) =>{setRegisterPassword(event.target.value)}} />
                <button onClick={register}>Create User</button>
            </div>
            <div  style={{marginBottom:'50px'}}>
                <h2 style={{marginBottom:'30px'}}>Login User</h2>
                <input type="email" placeholder='Email'  onChange={(event) =>{setLoginEmail(event.target.value)}} />
                <input type="password" placeholder='Password' onChange={(event) =>{setLoginPassword(event.target.value)}} />
                <button onClick={login}>Login User</button>
            </div>
            <div>
                <h1  style={{marginBottom:'30px'}}>User Info</h1>
                <h3>mail:</h3>
                {/* {userInfo?.email} */}
                <button onClick={logout}>Sign Out</button>
            </div>

        </div>
    );
};

export default EmailAuth;