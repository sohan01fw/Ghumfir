import React from "react";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
const Softbtn = () => {
  return (
    <div>
      <ButtonGroup size="sm" isAttached variant="outline">
        <IconButton aria-label="Add to friends" icon={<AddIcon />} />
      </ButtonGroup>
    </div>
  );
};

export default Softbtn;
