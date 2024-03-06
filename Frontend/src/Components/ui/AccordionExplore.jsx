import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Image,
} from "@chakra-ui/react";
const AccordionExplore = () => {
  return (
    <div>
      <Accordion
        defaultIndex={[1]}
        allowMultiple
        paddingTop={20}
        marginLeft={65}
      >
        <AccordionItem>
          <h2>
            <AccordionButton width={"130px"} fontSize={20}>
              <AccordionIcon color={"black"} paddingRight={"5px"} />
              <Box
                color={"black"}
                whiteSpace={"nowrap"}
                fontWeight="600"
                fontSize={17}
              >
                Explore
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}></AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AccordionExplore;
