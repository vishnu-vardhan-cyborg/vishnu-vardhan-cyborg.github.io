import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  containerClassName = '',
  textClassName = '',
  baseOpacity = 1,
  enableBlur = true,
  baseRotation = 0,
  blurStrength = 4,
  inText
}) => {
  const containerRef = useRef(null);

  // Memoize and safely split text into span-wrapped characters
  const splitText = useMemo(() => {
    if (typeof children !== 'string') return children;
    return children.split('').map((char, i) =>
      char === ' ' ? (
        <span key={`space-${i}`} className="letter-space">&nbsp;</span>
      ) : (
        <span key={`char-${i}`} className="letter">{char}</span>
      )
    );
  }, [children]);

  useEffect(() => {
    const letters = containerRef.current?.querySelectorAll('.letter');
    if (!letters || letters.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 90%',
        end: 'bottom 50%',
        toggleActions: 'play reverse play reverse',
      },
    });

    tl.fromTo(
      letters,
      {
        opacity: baseOpacity,
        y: 20,
        rotation: baseRotation,
        filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
        color: 'rgba(255, 255, 255, 0.3)',
      },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        filter: 'blur(0px)',
        color: 'rgba(255, 255, 255, 1)',
        duration: 0.4,
        ease: 'power3.out',
        stagger: 0.03,
      }
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [baseOpacity, baseRotation, blurStrength, enableBlur]);

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </div>
  );
};

export default ScrollReveal;
