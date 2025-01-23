// Home.jsx
import React, {useState} from 'react';
import ThreeAnimation from '../ThreeAnimation/ThreeAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'; 
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
const heroButtonLinks = [
  {
    aLink: 'https://github.com/Viral8051',
    icon: faGithub,
    tooltip: null,  
  },
  {
    aLink: 'https://www.linkedin.com/in/viralbhoot/',
    icon: faLinkedin,
    tooltip: null,
  },
  {
    aLink: 'mailto:viralbhoot1225@gmail.com', 
    icon: faEnvelope,
    tooltip:  "viralbhoot1225@gmail.com",
  },

];
const Hero = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState("");

  const handleMouseEnter = (tooltip) => {
    if (tooltip) {
      setTooltipText(tooltip);
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    alert("Email copied to clipboard!");
  };
  return (
    <>
      <div className="heroMain">
        <div className='heroInfo'>
            <p className='heroInfoinner'>
            Code, Creativity, and Coffee – Crafting Web Experiences That Click.
            </p>
            <div className="heroButtons">
              {heroButtonLinks.map((item, index) => (
              <button
              key={index}
              onMouseEnter={() => handleMouseEnter(item.tooltip)}
              onMouseLeave={handleMouseLeave}
              onClick={() => item.tooltip && handleCopyEmail(item.tooltip)}
            >
              <a
                href={item.aLink}
                target="_blank"
                rel="noopener noreferrer"
                
              >
                <FontAwesomeIcon icon={item.icon} />
              </a>
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
