'use client';
import { useEffect, useRef } from 'react';
import './../styles/animations.css';

export default function CustomScrollbar() {
  const scrollThumbRef = useRef(null);
  const scrollTrackRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current || document.documentElement;
    const thumb = scrollThumbRef.current;
    const track = scrollTrackRef.current;

    const updateScrollThumb = () => {
      if (!thumb || !container) return;
      
      const { scrollTop, scrollHeight, clientHeight } = container;
      const thumbHeight = (clientHeight / scrollHeight) * clientHeight;
      const thumbPosition = (scrollTop / (scrollHeight - clientHeight)) * (clientHeight - thumbHeight);
      
      thumb.style.height = `${Math.max(thumbHeight, 50)}px`;
      thumb.style.transform = `translateY(${thumbPosition}px)`;
    };

    const handleScroll = () => {
      updateScrollThumb();
      
      // Add curvy scroll effect to content
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
          section.style.transform = `translateY(${Math.sin(rect.top / window.innerHeight * Math.PI) * 20}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateScrollThumb);
    
    // Initialize
    updateScrollThumb();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollThumb);
    };
  }, []);

  return (
    <div className="custom-scrollbar">
      <div className="scroll-track" ref={scrollTrackRef}></div>
      <div className="scroll-thumb" ref={scrollThumbRef}></div>
    </div>
  );
}