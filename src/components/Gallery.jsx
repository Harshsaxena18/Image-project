import React,{ useState } from 'react'
// mui
import { 
    Typography,
    Box,
    Stack,
} from "@mui/material";
// carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// components
import Title from './Title'
import Paragraph from './Paragraph'


const Gallery = () => {
    
    const [currentIndex, setCurrentIndex] = useState();

    const imageData = [
        {
            alt: 'image1',
            cap:'group of friends walking on beach shore',
            url: 'https://images.pexels.com/photos/7148443/pexels-photo-7148443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            alt: 'image2',
            cap:'celebrant having her birthday with her friends',
            url: 'https://images.pexels.com/photos/9543840/pexels-photo-9543840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            alt: "image3",
            cap:'three men playing soccer',
            url: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            alt: "image4",
            cap:'brown cattle on a open field',
            url: 'https://images.pexels.com/photos/36347/cow-pasture-animal-almabtrieb.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            alt: "image5",
            cap:'red old fashioned pick up truck on street-',
            url: 'https://images.pexels.com/photos/20111709/pexels-photo-20111709/free-photo-of-red-old-fashioned-pick-up-truck-on-street.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
    ];
  
    const renderSlides = imageData.map((image) => (
    <div key={image.alt}>
        <img src={image.url} alt={image.alt} />
        <Typography
            variant='h5'
            component='h4'
            align='center'
            sx={{
                paddingTop: 1,
                border: '3px solid orange',
            }}>
                {image.cap}
        </Typography>
        
    </div>
    ));


    const handleChange = (index) => {
        setCurrentIndex(index);
    }

    return (
        <Stack
        direction='column'
        justifyContent= 'center'
        alignItems= 'center'
        sx={{
            py: 8,
            px: 2,
            display: { xs: 'flex'},
        }}
        >
            <Box
            component='section'
            sx={{
                paddingBottom: 3,
            }}
            >
                <Title 
                text={
                    'See My Work in Action'
                }
                textAlign={'center'}
                />
                
                <Paragraph text={
                    'A sample of our work on neural network demonstrating \
                    its ability to provide meaningful and accurate\
                    description 99% of the time.'
                } 
                maxWidth = {'sm'}
                mx={'auto'}
                textAlign={'center'}
                />
            </Box>
            
            <Box sx={{ 
                maxWidth: 700,
                width: '100%',
            }}>
                <Carousel
                centerSlidePercentage={40}
                thumbWidth={180}
                dynamicHeight={false}
                centerMode={false}
                showArrows={false}
                autoPlay={false}
                infiniteLoop={true}
                selectedItem={imageData[currentIndex]}
                onChange={handleChange}
                className="carousel-container"
                >
                {renderSlides}
                </Carousel>
            </Box>
        </Stack>
    )
}

export default Gallery