import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, FacebookAuthProvider } from "firebase/auth";


firebase.initializeApp(firebaseConfig);
const auth = getAuth();

const Authentication = () => {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',  // password-er jnno alada function n codings;
        photo: ''
        
        
    });
    const googleprovider = new GoogleAuthProvider();
    const fbProvider = new FacebookAuthProvider();

    const handleSignin = () =>{
        signInWithPopup(auth, googleprovider)
        .then(result =>{
            const { displayName, photoURL, email } = result.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            setUser(signedInUser);
            console.log(result)
        }).catch((error) =>{
            console.log(error.message)
        })
    }

    const handleFbSignIn = () =>{
        signInWithPopup(auth, fbProvider)
        .then((result) => {
            // The signed-in user info.
            const {displayName, photoURL, email} = result.user;
            const signedInFbUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            setUser(signedInFbUser);

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            console.log( 'facebook momo' ,user);
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
        });
    }

    const handleSignOut = () =>{
        signOut(auth)  // SignOut sob ekrokom;
        .then(() =>{
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: '',
                error: '',  // kaj korche na;
                success: false   // kaj korche;

            }
            setUser(signedOutUser);
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }

    const handleBlur = (e) =>{
        // console.log(e.target.name, e.target.value);
        let isFieldValid = true;
        if(e.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
            
        }
        if(e.target.name === 'password'){
            const validPassword = e.target.value.length >= 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            // console.log(validPassword && passwordHasNumber)
            isFieldValid = validPassword && passwordHasNumber;
        }
        if(isFieldValid){
            const newUserInfo = {...user};  // 'user' state-k copy kore nie asa holo;
            newUserInfo[e.target.name] = e.target.value;  // state-e new property add kora holo;
            setUser(newUserInfo);  // purota valid hobar por UI-e dekhabe;
        }

    }
    const handleSubmit = (e) =>{
        console.log(user.email, user.password);
        if(newUser && user.name && user.password){
            try {
                createUserWithEmailAndPassword(auth, user.email, user.password)
                .then(()=>{
                    let newUserInfo2 = {...user};
                    newUserInfo2.error = '';
                    newUserInfo2.success = true;
                    setUser(newUserInfo2);
                    updateUserName(user.name)
                    
                })
            } catch (error) {
                const newUserInfo2 = {...user};
                newUserInfo2.error = error.message;
                newUserInfo2.success = false;
                setUser(newUserInfo2);
            }
            
        }
        if(!newUser && user.name && user.password){
            try {
                signInWithEmailAndPassword(auth, user.email, user.password)
                .then(()=>{
                    let newUserInfo2 = {...user};
                    newUserInfo2.error = '';
                    newUserInfo2.success = true;
                    setUser(newUserInfo2);
                    console.log('signIn user info', user);
                    
                })
            } catch (error) {
                const newUserInfo2 = {...user};
                newUserInfo2.error = error.message;
                newUserInfo2.success = false;
                setUser(newUserInfo2);
            }
            
        }
        e.preventDefault();  // default vabe jei load ney seta prevent kore;
    }

    const updateUserName = name =>{
        updateProfile(auth.currentUser, {
            displayName: name 
            
          }).then(() => {
            console.log('user name update successful');
          }).catch((error) => {
            console.log(error);
          });
    }


    return (
        <div>
            {
                user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignin}>Google Sign In</button>
            
            }
            <br />
            {
                user.isSignedIn ? <button style={{fontSize: ' 26px', color: '#fff',cursor:'pointer', background: 'blue', padding:'5px 10px'}} onClick={handleSignOut}>Sign Out</button> : <button onClick={handleFbSignIn} style={{fontSize: ' 26px', color: '#fff',cursor:'pointer', background: 'blue', padding:'5px 10px'}}>Facebook</button>
            
            }
            
            {
                user.isSignedIn && 
                <div>
                    <h2>Hello, {user.name}</h2>
                    <h3>Mail: {user.email}</h3>
                    <img style={{width: '200px'}} src={user.photo} alt='popo' />
                </div>
            }
            
            <div style={{border: '2px solid #333', margin:'50px 0',padding:'50px 0'}}>
                <h1  style={{margin:'0 0 20px'}}>Jhankar's Authentication</h1>
                <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id="" />
                {/* xoss ekta condition */}
                <label htmlFor="newUser">New user sign up</label>
                <h3>Name: {user.name}</h3>
                <h3>Email: {user.email}</h3> 
                <h3>Password: {user.password}</h3>
                <form onSubmit={handleSubmit}>
                    {newUser && <input type="text" name='name' onBlur={handleBlur} placeholder='name'  />} 
                    <input type="email" name="email" onBlur={handleBlur} placeholder='email' required />
                    <input type="password" name="password" onBlur={handleBlur} placeholder='password' required />
                    <br />
                    <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
                </form>
                <p style={{color:'red'}}>Message: {user.error}</p>
                {user.success && <p style={{color:'green'}}>Account created successfully{user.success}</p>}
             </div>
        </div>
    );
};

export default Authentication;