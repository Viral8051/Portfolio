// Home.jsx
import React from 'react';
import ThreeAnimation from '../ThreeAnimation/ThreeAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'; 
const heroButtonLinks = [
  {
    aLink: 'https://github.com/Viral8051',
    icon: faGithub  
  },
  {
    aLink: 'https://www.linkedin.com/in/viralbhoot/',
    icon: faLinkedin
  },
];
const Hero = () => {
  
  return (
    <>
      <div className="heroMain">
        <div className='heroInfo'>
            <p className='heroInfoinner'>
            Code, Creativity, and Coffee – Crafting Web Experiences That Click.
            </p>
            <div className="heroButtons">
              {heroButtonLinks.map((item, index) => (
              <button key={index}>
              <a href={item.aLink} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={item.icon} /></a>
              </button>
              ))}
            </div>

        </div>
        <div className='heroModel'>
          <ThreeAnimation></ThreeAnimation>
        </div>
      </div>
    </>
  );
};

export default Hero;
