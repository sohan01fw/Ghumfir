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
import "./Accordation.css";
const Accordation = ({ title }) => {
  return (
    <div>
      <Accordion defaultIndex={[0]} allowMultiple border="transparent">
        <AccordionItem>
          <h2>
            <AccordionButton width={"160px"}>
              <AccordionIcon color={"black"} paddingRight={"5px"} />
              <Box color={"black"} whiteSpace={"nowrap"}>
                {title}
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <div className="addedplaces">
              <div className="placetitle">
                <h4>Phewa Lake</h4>
              </div>
              <div className="placeimg">
                <img
                  src="https://www.bing.com/th?id=OIP.2z6Gv66T56RbDX5VMqKYUgHaFj&w=155&h=110&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2"
                  alt=""
                />
              </div>
            </div>
            <div className="inner-accor">
              <Accordion defaultIndex={[0]} allowMultiple border="transparent">
                <AccordionItem>
                  <h2>
                    <AccordionButton width={"190px"}>
                      <AccordionIcon color={"black"} paddingRight={"5px"} />
                      <Box color={"black"} whiteSpace={"nowrap"}>
                        Recomended places
                      </Box>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <div className="recomended-places">
                      <div className="r-places">
                        <div className="r-img">
                          <img
                            src="https://www.bing.com/th?id=OIP.2z6Gv66T56RbDX5VMqKYUgHaFj&w=155&h=110&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2"
                            alt=""
                          />
                        </div>
                        <div className="r-name">phewa tal</div>
                        <div className="add-places">
                          <Button
                            colorScheme="blackAlpha"
                            bgColor="#f1f2f5"
                            width="10px"
                            height="29px"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Accordation;
