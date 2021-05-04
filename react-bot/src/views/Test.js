import React from "react";
import "views/Box.css";
import { Card } from "react-bootstrap";
import  { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { FaStar } from 'react-icons/fa';

  
  export default function Test() {
    const [ForumList, setForumList] = useState([]);
    const stars = Array(5).fill(0)
  
    useEffect(() => {
      Axios.get("http://localhost:3001/forum").then((response) => {
        
        setForumList(response.data); 
        console.log(response.data);
      });
    }, []);

    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"
    
      };
    
      const styles = {
        container: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        },
        stars: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        },
        textarea: {
          border: "1px solid #a9a9a9",
          borderRadius: 5,
          padding: 10,
          margin: "20px 0",
          minHeight: 100,
          width: 300
        },
        button: {
          border: "1px solid #a9a9a9",
          borderRadius: 5,
          width: 300,
          padding: 10,
        }
      }
    const renderCard = (card, index) => {
        return (
          <Card style={{ width: "18rem" }} key={index} className="box">
            
            <Card.Body>
                <Card.Title>
                <div style={styles.stars}>
                      {stars.map((_, index) => {
                        return (
                          <FaStar
                            key={index}
                            size={24}

                            color={(card.starValue) > index ? colors.orange : colors.grey}
                            style={{
                              marginRight: 10,
                              cursor: "pointer"
                            }}


                          />
                        )
                      })}
                    </div>

                </Card.Title>
              <Card.Subtitle><strong>{card.author}</strong></Card.Subtitle>

              <Card.Text>{card.description}</Card.Text>
            </Card.Body>
          </Card>
        );
      };
    
      return <div className="grid">{ForumList.map(renderCard)}</div>;
    };
  
  