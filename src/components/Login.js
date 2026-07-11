import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaGoogle, 
  FaShieldAlt, 
  FaDatabase, 
  FaVideo, 
  FaFile,
  FaLock,
  FaServer,
  FaCheckCircle
} from 'react-icons/fa';
import { signInWithGoogle } from '../firebase';
import toast from 'react-hot-toast';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success('Secure authentication successful!', {
        icon: '🔐',
        duration: 4000,
        style: {
          background: '#1a1a1a',
          color: '#00ff88',
          border: '1px solid #00ff88',
        }
      });
    } catch (error) {
      toast.error('Authentication failed: ' + error.message, {
        icon: '❌',
        duration: 4000,
        style: {
          background: '#1a1a1a',
          color: '#ff4444',
          border: '1px solid #ff4444',
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: <FaFile />, text: 'Secure File Deletion' },
    { icon: <FaVideo />, text: 'Secure Video Deletion' },
    { icon: <FaLock />, text: 'Military-grade Encryption' },
    { icon: <FaServer />, text: 'Remote Device Access' },
  ];

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="particles"></div>
      </div>
      
      <motion.div 
        className="login-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
      >
        <div className="login-header">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <FaShieldAlt className="login-icon" />
          </motion.div>
          <h1>Secure Deletion Server</h1>
          <p>Enterprise-grade file & video deletion system</p>
          <span className="security-badge">
            <FaCheckCircle /> AES-256 Encrypted
          </span>
        </div>

        <div className="login-features-grid">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="feature-icon">{feature.icon}</span>
              <span className="feature-text">{feature.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          className="login-button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {loading ? (
            <span className="loading-text">
              <span className="spinner-small"></span>
              Authenticating...
            </span>
          ) : (
            <>
              <FaGoogle className="google-icon" />
              Authenticate with Google
            </>
          )}
        </motion.button>

        <div className="login-footer">
          <p className="login-info">
            🔒 End-to-end encrypted connection • 256-bit SSL
          </p>
          <p className="login-info" style={{ fontSize: '10px', marginTop: '5px' }}>
            Compliant with GDPR, HIPAA, ISO 27001
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
