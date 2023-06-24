import React, { useState } from "react";
import "./Card.css";
import { motion, AnimatePresence } from "framer-motion";

const Card = (props) => {
  const { title } = props;
  const [expanded, setExpanded] = useState(false);

  if (title === "Balance") {
    return <CompactCard param={props} />;
  }

  return (
    <AnimatePresence>
      {expanded ? (
        <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      )}
    </AnimatePresence>
  );
};

function CompactCard({ param, setExpanded }) {
  return (
    <motion.div
      className="card-container"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      onClick={setExpanded}
    >
      <span>{param.title}</span>
      <div className="detail">
        <b>
          <span>${param.value}</span>
        </b>
      </div>
    </motion.div>
  );
}

function ExpandedCard({ param, setExpanded }) {
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "source") {
      setName(e.target.value);
    } else if (e.target.name === "amount") {
      setValue(e.target.value);
    } else if (e.target.name === "date") {
      setDate(e.target.value);
    }
  };

  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
    >
      <div
        style={{
          alignSelf: "flex-end",
          cursor: "pointer",
          color: "#6540bf",
        }}
        onClick={setExpanded}
      >
        X
      </div>
      <span>{param.title}</span>
      <input
        className="addinput"
        type="text"
        name="source"
        placeholder="Source"
        value={name}
        onChange={handleChange}
      />
      <input
        className="addinput"
        type="number"
        name="amount"
        placeholder="Amount"
        value={value}
        onChange={handleChange}
      />
      <input
        className="addinput"
        type="Date"
        name="date"
        placeholder="Date"
        value={date}
        onChange={handleChange}
      />
      <button className="addbutton" type="submit">
        ADD
      </button>
    </motion.div>
  );
}

export default Card;
