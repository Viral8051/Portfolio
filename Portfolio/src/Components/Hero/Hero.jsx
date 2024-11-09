// Home.jsx
import React from 'react';
import ThreeAnimation from '../ThreeAnimation/ThreeAnimation';

const Hero = () => {
  return (
    <>
      <div className="heroMain">
        <div className='heroInfo'>
            <p className='heroInfoinner'>
              A Skilled Front end developer with 5 years of experience. Expert in front end technologies like Html5, CSS, SQL, and JavaScript using different frameworks like React Js and Vue JS. Passionate about Web Applications development and committed to optimizing codes by applying innovative solutions. Eager to contribute to web projects that align with organizational goals while enhancing my hands-on experience. Dedicated to continues learning more frameworks and growth within a dynamic as well as collaborative front end environment.
            </p>
        </div>
        <div className='heroModel'>
          <ThreeAnimation></ThreeAnimation>
        </div>
      </div>
    </>
  );
};

export default Hero;
