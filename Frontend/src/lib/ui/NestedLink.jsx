import React from "react";
import "./NestedLink.css";
import { ChevronRightIcon, DeleteIcon } from "@chakra-ui/icons";
const NestedLink = ({ data }) => {
  return (
    <div className="mainlink-container">
      <div className="link-container">
        <div className="innerlink-container">
          <div className="title">
            <h2 className="t-head">{data.itiInfo.place}</h2>
          </div>

          <div className="description">
            <p>
              pokhara is beautiful contry of nepal. Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Culpa odit sint animi ratione illo?
              Autem voluptates numquam, voluptas, dolores blanditiis, quisquam
              sapiente voluptatum magnam tempore eum fugit. Exercitationem,
              minima officiis?
            </p>
          </div>
          <div className="right-arrow">
            <h5>Details</h5>
            <ChevronRightIcon />
          </div>
        </div>
        <div className="images">
          <img src="" alt="image" />
        </div>
      </div>
    </div>
  );
};

export default NestedLink;
