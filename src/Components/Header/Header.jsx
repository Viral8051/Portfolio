import React, { useState, useEffect } from 'react';

function Header() {
  const [nameChars, setNameChars] = useState('');
  const [designChars, setDesignChars] = useState('');
  const [showImage, setShowImage] = useState(false); // State to control image display
  const [imageOpacity, setImageOpacity] = useState(1); // State to control image opacity

  const nameText = "Viral Bhut";
  const designText = "Front End Developer";
  const originalColor = '#76D5FB'; // Original font color

  useEffect(() => {
    const nameTimeouts = [];
    const designTimeouts = [];
    const removeTimeouts = [];

    // Function to display characters with a delay
    const displayChars = (text, setFunction, timeoutArray, delay, onComplete) => {
      text.split("").forEach((char, index) => {
        const timeout = setTimeout(() => {
          setFunction(prev => prev + char);
          // Call onComplete if it's the last character
          if (index === text.length - 1 && onComplete) {
            onComplete(); // Trigger the completion function
          }
        }, index * delay);
        timeoutArray.push(timeout); // Push each timeout to the array
      });
    };

    // Function to remove characters with a delay
    const removeChars = (length, setFunction, timeoutArray, delay, onComplete) => {
      for (let index = 0; index < length; index++) {
        const timeout = setTimeout(() => {
          setFunction(prev => prev.slice(0, -1)); // Remove the last character
          if (index === length - 1 && onComplete) {
            onComplete(); // Trigger the completion function
          }
        }, index * delay);
        timeoutArray.push(timeout);
      }
    };

    // Clear state and start the display sequence
    setNameChars(''); // Clear name state
    setDesignChars(''); // Clear designation state

    // Display name first
    displayChars(nameText, setNameChars, nameTimeouts, 200, () => {
      // Change the color to red after the name is fully displayed
      document.querySelector('#headerName h1').style.color = 'red';
      setShowImage(true); // Show the image after the name is displayed

      // Display designation after the name is done
      const designDelay = nameText.length * 200; // Delay based on name length
      const designTimeout = setTimeout(() => {
        // Clear the designation state before displaying
        setDesignChars('');
        displayChars(designText, setDesignChars, designTimeouts, 200, () => {
          // After displaying the designation, start removing characters from "ut"
          const removeDelay = designText.length * 50; // Wait for a second before removing
          const removeTimeout = setTimeout(() => {
            // Remove "ut" from "Bhut"
            removeChars(2, setNameChars, removeTimeouts, 200, () => {
              // After removing "ut", now display "Bhoot"
              const bhootPart = "Bhoot"; // The part to add back
              setTimeout(() => {
                // Set nameChars to "Viral B" and then add "Bhoot"
                setTimeout(() => {
                  setNameChars(prev => prev + "o"); // Add "o"
                  setTimeout(() => {
                    setNameChars(prev => prev + "o"); // Add "o" again
                    setTimeout(() => {
                      setNameChars(prev => prev + "t"); // Finally add "t"
                      // Change back to the original color after correction
                      setTimeout(() => {
                        document.querySelector('#headerName h1').style.color = originalColor; // Reset color
                        // Fade out the image before hiding it
                        setImageOpacity(0); // Start fading out

                        // Set a timeout to hide the image after the fade-out completes
                        setTimeout(() => {
                          setShowImage(false); // Hide the image after it fades out
                          setImageOpacity(1); // Reset opacity for future display
                        }, 500); // Match this duration with your CSS transition duration
                      }, 200); // Wait briefly before changing color
                    }, 200);
                  }, 200);
                }, 200);
              }, 1000); // Pause before adding the corrected part
            });
          }, removeDelay);

          // Cleanup for the design timeout
          return () => clearTimeout(designTimeout);
        });
      }, designDelay);

      // Cleanup for the name change timeout
      return () => {
        clearTimeout(designTimeout);
        removeTimeouts.forEach(timeout => clearTimeout(timeout));
      };
    });

    // Cleanup timeouts on unmount to prevent memory leaks or duplication
    return () => {
      nameTimeouts.forEach(timeout => clearTimeout(timeout));
      designTimeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []); // Empty dependency array to run only on component mount

  return (
    <>
    <div className="container">
      <div className='headerMain'>
        <div className='headerName' id='headerName'>
          <h1>
            {nameChars}
            {showImage && (
              <img
                src="/images/header/explan.png"
                alt="Description"
                style={{
                  marginLeft: '10px',
                  width: '15px',
                  height: '15px',
                  opacity: imageOpacity,
                  transition: 'opacity 0.5s ease', // Smooth transition for opacity
                }}
              />
            )}
          </h1>
        </div>
        <div className='headerDesgn' id='headerDesgn'>
          <h2>{designChars}</h2>
        </div>
      </div>
      </div>
    </>
  );
}

export default Header;
