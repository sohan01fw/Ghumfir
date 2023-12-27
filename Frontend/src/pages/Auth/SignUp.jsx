// import  { useState } from 'react';
// // import { createUserWithEmailAndPassword } from 'firebase/auth';
// // import { auth } from '../firebase';

// const SignUp = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     // try {
//     //   await createUserWithEmailAndPassword(auth, email, password);
//     //   // Redirect or perform other actions upon successful SignUp
//     // } catch (error) {
//     //   console.error('Error signing up:', error.message);
//     // }
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSignUp}>
//         <label>Email:</label>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <label>Password:</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// };

// export default SignUp;


// SignUp.js
import { useState } from 'react';
import './SignUp.css'; 

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Your sign-up logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="signupContainer">
    <form onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
        />
      </label>

      <button type="submit" >
        Sign Up
      </button>
    </form>
    </div>
  );
};

export default SignUp;
