import React, { useEffect, useState, useRef } from 'react';

function PortData() {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);  // Track visibility
  const paragraph =
    "As a Front End Developer I have worked in various firms from all around the world. Here are some of my projects that showcase my work and love for Front End Development.";

  const words = paragraph.split(' ');
  const sectionRef = useRef(null);

  // Intersection Observer to trigger animation when the portfolio section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);  // Section is visible, start animation
          }
        });
      },
      { threshold: 0.5 }  // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Start the word-by-word animation when the section becomes visible
  useEffect(() => {
    if (isVisible) {
      let currentIndex = 0;

      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + ' ' + words[currentIndex]);
        currentIndex++;

        if (currentIndex === words.length) {
          clearInterval(interval); // Stop once all words are displayed
        }
      }, 300); // Adjust speed by changing this value (in ms)

      return () => clearInterval(interval); // Clean up interval on unmount
    }
  }, [isVisible]);

  return (
    <>
      <div className="portDataMain">
        <div className="portDatahead">
          <h2>Portfolio</h2>
        </div>
      </div>

      {/* Portfolio section */}
      <div ref={sectionRef} className="portfolioSection">
        <div className="portfolioContent">
          <p>{displayedText}</p>
        </div>
        
      </div>
    </>
  );
}

export default PortData;
