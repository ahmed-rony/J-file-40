import Authentication from "./components/firebaseAuth.js/Authentication";
import EmailAuth from "./components/firebaseAuth.js/EmailAuth";

// import Pages from "./components/Pages/Pages";




function App() {
  return (
    <div  style={{textAlign:'center'}}>
      {/* file:41(firebase) */}
      <Authentication></Authentication>
      <EmailAuth></EmailAuth>
      
      
      {/* file:40(assignmeent) */}
      {/* <Pages></Pages> */}
    </div>
  );
}

export default App;
