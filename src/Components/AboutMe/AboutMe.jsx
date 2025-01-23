import React, { useEffect, useState } from 'react';

// Grouped skills array
const groupedSkills = [
  [
    { name: 'HTML5', icon: 'images/AboutMe/Skills/html5.png', alt: 'htmlSkill' },
    { name: 'CSS3', icon: 'images/AboutMe/Skills/css3.png', alt: 'cssSkill' },
    { name: 'JavaScript', icon: 'images/AboutMe/Skills/javascript.png', alt: 'jsSkill' },
    { name: 'SQL', icon: 'images/AboutMe/Skills/sql.png', alt: 'sqlSkill' },
    { name: 'jQuery', icon: 'images/AboutMe/Skills/jquery.png', alt: 'jqSkill' },
    { name: 'bootstrap', icon: 'images/AboutMe/Skills/bootstrap.png', alt: 'bootstrapSkill' },
  ],
  [
    { name: 'React', icon: 'images/AboutMe/Skills/react.png', alt: 'reactSkill' },
    { name: 'TypeScript', icon: 'images/AboutMe/Skills/typescript.png', alt: 'tsSkill' },
    { name: 'Redux', icon: 'images/AboutMe/Skills/redux.png', alt: 'reduxSkill' },
    { name: 'Node.js', icon: 'images/AboutMe/Skills/node.png', alt: 'nodeSkill' },
  ],
  [
   
    { name: 'PostgreSQL', icon: 'images/AboutMe/Skills/postgresql.png', alt: 'postgresqlSkill' },
    { name: 'Three.js', icon: 'images/AboutMe/Skills/threejs.png', alt: 'threejsSkill' },
    { name: 'Cypress', icon: 'images/AboutMe/Skills/cypress.png', alt: 'cypressSkill' },
  ],
  [
    { name: 'Docker', icon: 'images/AboutMe/Skills/docker.png', alt: 'dockerSkill' },
    { name: 'Jest', icon: 'images/AboutMe/Skills/jest.png', alt: 'jestSkill' },
  ]
];

const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageVisibility, setImageVisibility] = useState([]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInView) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial render

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Trigger image visibility one by one after a slight delay
  useEffect(() => {
    if (isVisible) {
      groupedSkills.forEach((group, groupIndex) => {
        group.forEach((_, skillIndex) => {
          setTimeout(() => {
            setImageVisibility((prev) => [...prev, { groupIndex, skillIndex }]);
          }, (groupIndex * 1000) + (skillIndex * 500)); // Stagger group and skill items
        });
      });
    }
  }, [isVisible]);

  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title about">About Me</h2>
        <div className="aboutDesc">
          <p>
          Hi, I'm Viral Bhoot, a front-end developer with over five years of experience working across a range of industries, from web agencies to tech companies. I specialize in building high-performance applications with React and Vue.js and have extensive experience in creating scalable, maintainable code. My passion for web development drives me to continuously improve my skills, stay updated on the latest trends, and contribute to projects that make a real impact.
          </p>
          <p>I specialize in building responsive, user-friendly web applications using a variety of front-end technologies such as HTML5, CSS3, JavaScript, and TypeScript. I am experienced in using frameworks like React.js and Vue.js to create engaging user experiences and streamline application performance.</p>
        </div>
        <div className="skills">
          <h3>Skills<span className="blinkCurser">_</span></h3>
          <div className="skillsList">
            {groupedSkills.map((group, groupIndex) => (
              <div key={groupIndex} className="skillRow">
                {group.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className={`skillListItem ${imageVisibility.some(
                      (item) => item.groupIndex === groupIndex && item.skillIndex === skillIndex
                    ) ? 'visible' : ''}`}
                    style={{
                      animationDelay: `${(groupIndex * 1000) + (skillIndex * 500)}ms`, // Delay each skill image in a group
                    }}
                  >
                    <img src={skill.icon} alt={skill.alt} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
