import { Button, Container, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { clientContext } from "../contexts/ClientContext";

const CustomersReview = () => {
  const data = useContext(clientContext);
  const { getSneakersDetails, sneakersDetails, addFeedback } = data;
  const params = useParams();
  console.log(params);

  const [feedbackValue, setFeedbackValue] = useState("");
  const [feedbackUser, setFeedbackUser] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newFeedback = {
      title: feedbackValue.trim(),
      user: feedbackUser.trim(),
    };

    for (let key in newFeedback) {
      if (!newFeedback[key]) {
        alert("Fullfill all inputs");
        return;
      }
    }

    addFeedback(newFeedback, sneakersDetails);
    setFeedbackUser("");
    setFeedbackValue("");
  };

  useEffect(() => {
    getSneakersDetails(params.id);
  }, []);

  if (!sneakersDetails) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <Container>
        <div className="product-details">
          <img src={sneakersDetails.image} alt="" />
          <div>
            <h2>{sneakersDetails.subtype}</h2>
            <ul>
              <li>
                <strong>Price:</strong>
                {sneakersDetails.price}
              </li>
              <li>
                <strong>Sizes:</strong>
                {sneakersDetails.sizes}
              </li>
              <li>
                <strong>About sneakers:</strong>
                {sneakersDetails.desc}
              </li>
            </ul>
          </div>
        </div>
        <div className="product-details-feedback">
          <h3>Review: </h3>
          <form onSubmit={handleSubmit}>
            <TextField
              value={feedbackUser}
              type="text"
              onChange={(e) => setFeedbackUser(e.target.value)}
              label="Enter your name"
              variant="standard"
              style={{ marginBottom: 15 }}
            />
            <TextField
              style={{ marginBottom: 15 }}
              value={feedbackValue}
              onChange={(e) => setFeedbackValue(e.target.value)}
              type="text"
              label="Enter your feedback"
              multiline
              maxRows={5}
              minRows={3}
            />
            <Button type="submit" variant="outlined">
              Send review
            </Button>
          </form>
          <div>
            {sneakersDetails.feedback?.map((item, index) => (
              <div key={index} className="feedback">
                <h5>{item.user}</h5>
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <Container></Container>
    </div>
  );
};

export default CustomersReview;
