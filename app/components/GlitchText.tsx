'use client';

import React, { useState, useEffect } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>';

export default function GlitchText({ 
  text, 
  isHovered, 
  enableGlitch = true 
}: { 
  text: string, 
  isHovered: boolean,
  enableGlitch?: boolean
}) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!enableGlitch) {
      setDisplayText(text);
      return;
    }

    if (isHovered) {
      let iterations = 0;
      const maxIterations = 8;
      
      const interval = setInterval(() => {
        setDisplayText(prev => 
          prev.split('').map((char, index) => {
            if (char === ' ' || char === '[' || char === ']') return char;
            if (index < (iterations / maxIterations) * text.length) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join('')
        );
        
        iterations++;
        if (iterations >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, 30);
      
      return () => {
        clearInterval(interval);
        setDisplayText(text);
      };
    } else {
      setDisplayText(text);
    }
  }, [isHovered, text, enableGlitch]);

  return <span>{displayText}</span>;
}
