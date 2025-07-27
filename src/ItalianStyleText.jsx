import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ItalianStyleText = ({ text = "Benvenuto, Vishnu!" }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;

    gsap.set(el, {
      strokeDasharray: 1000,
      strokeDashoffset: 1200,
      fillOpacity: 0,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'top 20%',
        scrub: false,
        toggleActions: 'play reverse play reverse',
        markers: false, // turn off for performance
      }
    });

    tl.to(el, {
      strokeDashoffset: 0,
      duration: 5,
      ease: 'power1.out',
      force3D: true,
    }).to(el, {
      fillOpacity: 1,
      duration: 0.4,
      ease: 'power1.inOut',
    }, '-=3');
  }, []);

  return (
    <div style={{ width: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg
        width="80%"
        height="100%"
        viewBox="0 0 1000 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="silverBrightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F8F8FF" />
            <stop offset="50%" stopColor="#D3D3D3" />
            <stop offset="100%" stopColor="#A9A9A9" />
          </linearGradient>
        </defs>

        <text
          ref={textRef}
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="'Carattere' "
          fontSize="100"
          fill="url(#silverBrightGradient)"
          stroke="url(#silverBrightGradient)"
          strokeWidth="2"
          style={{ willChange: 'stroke-dashoffset, opacity' }} // boosts performance
        >
          {text}
        </text>
      </svg>
    </div>
  );
};

export default ItalianStyleText;
