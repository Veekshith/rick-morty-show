import React from "react";
import { Card } from "react-bootstrap";
import { CharacterWrapper } from "./CharacterStyles";
const Character = props => {
  const {
    id,
    name,
    status,
    species,
    type,
    gender,
    origin: { name: origin },
    location: { name: location },
    image,
    created
  } = props.character;
  const clickHandler = () => {
    console.log("Clicked");
  };
  return (
    <CharacterWrapper>
      <Card key={name} className="character-card">
        <Card.Header className="character-card-header">
          <Card.Img src={image} alt="Hello"></Card.Img>

          <div className="character-card-image-mask"></div>
          <div className="character-card-header-text">
            <span>{name}</span>
            <span>
              id:{id} &#8209; created {new Date().getYear() - new Date(created).getYear()} years ago
            </span>
          </div>
        </Card.Header>
        <Card.Body className="character-card-body">
          <div className="character-attributes">
            <div className="character-attribute">
              <span className="character-attribute-label">Status</span>
              <span className="character-attribute-value">
                {status}
              </span>
            </div>
            <div className="character-attribute">
              <span className="character-attribute-label">Species</span>
              <span className="character-attribute-value">{species}</span>
            </div>
            <div className="character-attribute">
              <span className="character-attribute-label">Gender</span>
              <span className="character-attribute-value">{gender}</span>
            </div>
            <div className="character-attribute">
              <span className="character-attribute-label">Origin</span>
              <span className="character-attribute-value">{origin}</span>
            </div>
            <div className="character-attribute">
              <span className="character-attribute-label">Last Location</span>
              <span className="character-attribute-value">{location}</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </CharacterWrapper>
  );
};

export default Character;
