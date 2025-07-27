import { useState } from 'react';
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import Dock from './dock/Dock'; // ✅ Make sure your Dock is working standalone already!

export default function DockWithContactPopup() {
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <div style={{
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
      }}>
        <Dock
          items={[
            {
              icon: <FaLinkedin size={20} />,
              label: 'LinkedIn',
              onClick: () => window.open('https://www.linkedin.com/in/vishnu-vardhan-190b11295', '_blank'),
            },
            {
              icon: <FaInstagram size={20} />,
              label: 'Instagram',
              onClick: () => window.open('https://www.instagram.com/vishnu_vardhan_401', '_blank'),
            },
            {
              icon: <FaGithub size={20} />,
              label: 'GitHub',
              onClick: () => window.open('https://github.com/vishnu-vardhan-cyborg', '_blank'),
            },
            {
              icon: <FiPhone size={20} />,
              label: 'Contact',
              onClick: () => setShowContact(true),
            },
          ]}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </div>

      {showContact && (
        <div style={{
          position: 'fixed',
          bottom: '120px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(20, 20, 30, 0.75)',
          padding: '1rem 2rem',
          borderRadius: '12px',
          color: 'white',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 15px rgba(0,0,0,0.3)',
          zIndex: 100,
        }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>Phone:</strong> 9392330769
          </div>
          <div>
            <strong>Email:</strong> vv0651496@gmail.com
          </div>
          <button
            onClick={() => setShowContact(false)}
            style={{
              marginTop: '1rem',
              background: 'transparent',
              border: '1px solid #555',
              color: '#eee',
              padding: '0.4rem 1rem',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '0.8rem',
            }}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}
