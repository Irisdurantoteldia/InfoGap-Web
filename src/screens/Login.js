import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/FirebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import fondo from '../assets/fondo.png';
import logo from '../assets/logo.png';  // Import the logo

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg('Please enter your email and password.');
      return;
    }

    // Check if email contains '@amin' between '@' and '.'
    if (!email.includes('@admin.') || email.split('@')[1].split('.')[0] !== 'admin') {
      setErrorMsg('Email must contain "@admin" between "@" and "."');
      return;
    }

    setErrorMsg(null);

    try {
      // Attempt to sign in with Firebase
      await signInWithEmailAndPassword(auth, email, password);
      setTimeout(() => navigate('/all'), 1); // Redirect to /all route
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorMsg('Invalid email address.');
          break;
        case 'auth/user-not-found':
          setErrorMsg('User does not exist.');
          break;
        case 'auth/wrong-password':
          setErrorMsg('Incorrect password.');
          break;
        default:
          setErrorMsg('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMsg('Please enter your email to reset the password.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Email sent! Check your inbox to reset the password.');
    } catch (error) {
      console.log('Error sending reset email:', error.code, error.message);
      setErrorMsg('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.loginBox}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>Welcome to Info Gap!</h1>

        {errorMsg && <p style={styles.errorText}>{errorMsg}</p>}

        <input
          style={styles.input}
          type="email"
          placeholder="Email..."
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password..."
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>Login</button>

        <br /><br />
        <center>
          <text style={styles.forgotPassword} onClick={handleForgotPassword}>
            Forgot your password?
          </text>
        </center>
      </div>
    </div>
  );
}

const styles = {
  background: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundImage: `url(${fondo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    position: 'absolute',
    top: 0,
  },
  loginBox: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '40px',
    width: '30%',
    maxWidth: '350px',
    minHeight: '270px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    textAlign: 'left',
  },
  logo: {
    width: '60px',  // Reduced size for the logo
    height: 'auto',
    marginBottom: '20px',  // Space between the logo and the title
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    filter: 'grayscale(100%)',  // Filter to make the logo black
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '30px',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    height: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '20px',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#333',
    padding: '14px',
    borderRadius: '8px',
    width: '100%',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '15px',
    fontSize: '18px',
  },
  forgotPassword: {
    color: '#666',
    cursor: 'pointer',
    fontSize: '14px',
    textAlign: 'center',
  },
};
