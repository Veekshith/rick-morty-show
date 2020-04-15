import React, { useEffect, useState } from "react";
import axios from "axios";
import Character from "./Character";
import CharactersListWrapper from "./CharactersListStyles";
// import * from "./CharacterStyles";

const CharactersList = ({ charactersList }) => {
  return (
    <CharactersListWrapper>
      {charactersList.length ? (
        charactersList.map((character, index) => {
          return <Character character={character} key={index} />;
        })
      ) : (
        <span className="notfound">NotFound</span>
      )}
    </CharactersListWrapper>
  );
};

export default CharactersList;
