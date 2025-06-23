import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faGlobe } from '@fortawesome/free-solid-svg-icons';


const portfolioData = [
  {
    title: 'CY Cafe',
    location: 'United Kingdom',
    image: 'images/PortImages/CyCafePort.png',
    skillIcon: 'images/AboutMe/Skills/react.png',
    webUrl:"https://cycafe.co.uk/"
    
  },
  {
    title: 'Body Without Arrows',
    location: 'United Kingdom',
    image: 'images/PortImages/ArrowsPort.png',
    skillIcon: 'images/AboutMe/Skills/elementor.png',
    webUrl:"https://driftingnarratives.net/arrows/"
  },
  {
    title: 'Anthem',
    location: 'India',
    image: 'images/PortImages/AnthemPort.PNG',
    skillIcon: 'images/AboutMe/Skills/html5.png',
    webUrl:"https://anthem-olive.vercel.app/"
  },
  {
    title: 'Conversion Clock',
    location: 'United States',
    image: 'images/PortImages/ConClockPort.png',
    skillIcon: 'images/AboutMe/Skills/html5.png',
    webUrl:"https://converson-clock.vercel.app/"
  },
  {
    title: 'Crafted with Code extension',
    location: 'United States',
    image: 'images/PortImages/CraftedCodePort.PNG',
    skillIcon: 'images/AboutMe/Skills/html5.png',
    webUrl:"https://craftedwithcodeextension.vercel.app/"
  },
  {
    title: 'LNG',
    location: 'India',
    image: 'images/PortImages/LngPort.PNG',
    skillIcon: 'images/AboutMe/Skills/html5.png',
    webUrl:"https://lng-lac.vercel.app/"
  },
];

function PortData() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < portfolioData.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="container">
    <div className="portDataMain">
      <div className="portDatahead">
        <h2>Projects</h2>
      </div>
      <div className="portDataBody" style={{backgroundImage: `url(${portfolioData[currentIndex].image})`}}>
        <div className="portCardsWrapper">
          {portfolioData.map((item, index) => (
            <div
              className={`portCard ${index === currentIndex ? 'active' : ''}`}
              key={index}
            >
              <div className="portCardImage">
                <img src={item.image} alt={`${item.title} portfolio`} />
              </div>
              <div className="portCardskills">
                <img src={item.skillIcon} alt={`${item.title} skill icon`} />
              </div>
              <div className="portCardDesc">
                <p className="portCardDescHead"><a href={item.webUrl} target='_blank'>{item.title} <span className='Webicon'><FontAwesomeIcon icon={faGlobe} /></span></a></p>
                <p>{item.location}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="portCardButtons">
          <button onClick={handlePrev} disabled={currentIndex === 0}>
          <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === portfolioData.length - 1}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default PortData;
