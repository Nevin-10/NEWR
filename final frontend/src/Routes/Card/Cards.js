import React from "react";
import "./Cards.css";
import Card from "../Card/Card";
import { Carditems } from "./Carditems";

const Cards = () => {
  return (
    <div className="Cards">
      {Carditems.map((card, id) => {
        return (
          <div key={id}>
            <Card
              title={card.title}
              color={card.color}
              value={card.value}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
