import React, { useEffect, useState } from 'react';
import './ScrollSnapBlink.css';

const texts = [
  'Every pixel and line of code <br />is placed with deliberate<br /> intention, crafting experiences <br />that not only functions  <br /> but also  resonate with <br />clarity and purpose.',

  'From concept to completion,<br /> every project is a journey of<br /> creativity,problem-solving,<br />and relentless refinement,<br />ensuring that the final product<br />tells a compelling and<br /> immersive story.',

  'I design interfaces that are not<br /> just beautiful, but intuitive—<br />blending visual aesthetics with <br />user-centric thinking<br />to create moments of delight<br />and lasting impressions.',

  'Scroll through this space where<br /> innovation meets design,<br />where function dances with <br />form, and where every <br />interaction reflects thoughtful <br />craftsmanship  and attention <br />to detail.',
];

export default function ScrollSnapBlink({ faceIndex }) {
  const [visible, setVisible] = useState(null);

  useEffect(() => {
    setVisible(faceIndex);
  }, [faceIndex]);

  return (
    <div className="snap-blink-container">
      {texts.map((text, i) => (
        <div
          key={i}
          className="snap-blink-line"
          style={{
            opacity: i === visible ? 1 : 0,
            transform: i === visible ? 'translateY(0)' : 'translateY(10px)',
            zIndex: i === visible ? 1 : 0,
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      ))}
    </div>
  );
}
