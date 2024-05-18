import React from "react";
import { Container } from "react-bootstrap";
import "./Team.css";
import harsh from "../assets/harsh.jpg";
import arora from "../assets/arora.jpg";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from '@mui/material/Link';


export default function Team() {
  return (
    <article id="team">
      <Container className="container">
        <div className="content">
          <h1 className="title">Meet the Team</h1>
          <div className="teamGrid">
            <div xs={4} className="member">
              <img
                src={harsh}
                alt="Harsh"
                
              />
              <h3 className="memberInfo">
                Harsh Raj
                <br />
                AI, Frontend
                <br />
                Saxenahharsh73@gmail.com
              </h3>
              <Link href="https://in.linkedin.com/in/harshraj18"variant="body2" 
                sx={{ color: '#414141', "&:hover": { color: '#1c2859',}
                  }}
              >
                <LinkedInIcon />
              </Link>
            </div>
            <div className="member" > 
              <img src={arora} alt="Aaditya" />
              <h3 className="memberInfo">
                Aaditya Arora
                <br />
                UI , Frontend
                <br />
                Aroraaaditya612@gmail.com
              </h3>
              <Link href="https://in.linkedin.com/in/aaditya-arora2"variant="body2" 
                sx={{ color: '#414141', "&:hover": { color: '#1c2859',}
                }}
              >
                <LinkedInIcon />
              </Link>
            </div>
            
          </div>
        </div>
      </Container>
    </article>
  );
}
