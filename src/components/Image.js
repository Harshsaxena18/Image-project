import React, { useState, useRef, useEffect ,useCallback} from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; // Import CSS for styling
import './Image.css';
import Gallery from './Gallery';

import {  Typography} from "@mui/material";
import Title from './Title'



const ImageScreen = () => {

    async function query(imageData) {
        const response = await fetch(
          'https://api-inference.huggingface.co/models/harshrajsaxena/Image',
          {
            method: 'POST',
            headers: {
              Authorization: 'Bearer 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',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              inputs: {
                image: imageData,
              },
            }),
          }
        );
      
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      
        const result = await response.json();
        return result;
      }

  const [selectedImages, setSelectedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current index
  const [caption, setCaption] = useState(null); // Store caption for the current image
  const [processing, setProcessing] = useState(false); // Track image processing state

  const speakText = useCallback((text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  }, []);
  

  const handleImageChange = (event) => {
    const newImages = Array.from(event.target.files);
    setSelectedImages(newImages);
    setCaption(null); // Clear caption when new images are uploaded
  };

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
    setCaption(null);
    
  };
  const previous = () => {
    sliderRef.slickPrev();
    setCaption(null);
  };
  const play = () => {
    sliderRef.slickPlay();
  };
  const pause = () => {
    sliderRef.slickPause();
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true, // Center the current slide within the slider
    centerPadding: '0px',
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    adaptiveHeight: true,
    beforeChange: (current, next) => {
      
      setCurrentIndex(next);
    },
    
  };

  // Function to process the current image
  const processCurrentImage = async () => {
    if (!selectedImages.length || currentIndex >= selectedImages.length) return;

    setProcessing(true); // Set processing state to true
    const currentImage = selectedImages[currentIndex];
    const reader = new FileReader();
    reader.onload = async () => {
      const imageData = reader.result.split(',')[1];
      try {
        const result = await query(imageData);
        const generatedText = result[0].generated_text;
        setCaption(generatedText);
        await speakText(generatedText);
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing the image.');
      } finally {
        setProcessing(false); // Set processing state to false
      }
    };
    reader.readAsDataURL(currentImage);
  };

  // Call processCurrentImage on every slide change and clear caption
  useEffect(() => {
    processCurrentImage();
    setCaption(null);  // eslint-disable-next-line
  }, [currentIndex, selectedImages]); 

  // Handle manual processing button (optional)
  const handleProcess = () => {
    processCurrentImage();
    
  };

  return (
    <div className="App">
    <Title 
    text={
        'Image Description Model'
    }
    textAlign={'center'}
    />
    <Typography
    variant='h5'
    component='h4'
    align='center'
    sx={{
        paddingTop: 1,
    }}
    >
        Powered by Inceptionv3 and LSTM
    </Typography>
      <label className="custom-upload">
        <input type="file" accept="image/*" multiple onChange={handleImageChange} id="file-upload" />
        <span className="upload-text">Click here to upload</span>
      </label>
      {selectedImages.length < 1 && (<Gallery />)}
      {selectedImages.length > 0 && (
        <div className="image-container" >
          <div className="current-index"> {currentIndex + 1} / {selectedImages.length} </div> {/* Display current index */}
          <Slider ref={slider => {
            sliderRef = slider;
          }} {...settings}>
                        {selectedImages.map((image) => (
              <img key={image.name} src={URL.createObjectURL(image)} alt={image.name} />
            ))}
          </Slider>
          <div style={{ textAlign: "center", padding: '50jthpx' }}>
            <button className="custom-button" onClick={previous}>
              Previous
            </button>
            <button className="custom-button" onClick={play}>
              Play
            </button>
            <button className="custom-button" onClick={pause}>
              Pause
            </button>
            <button className="custom-button" onClick={next}>
              Next
            </button>
            {processing && <p>Processing...</p>}  {/* Display processing indicator */}
            <button className="custom-button" disabled={processing} onClick={handleProcess}>
              Process Image
            </button>  {/* Button to manually process current image */}
          </div>
        
          {caption && 
            <Typography
              variant='h5'
              component='h4'
              align='center'
              sx={{
                paddingTop: 1,
                border: '3px solid orange',
                }}>
              {caption}
            </Typography>}
        </div>
      )}
    </div>
  );
};

export default ImageScreen; 
