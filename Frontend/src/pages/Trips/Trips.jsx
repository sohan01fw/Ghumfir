import { useNavigate } from "react-router-dom";
import { useEffect, useId, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Trips.css";
import short from "short-uuid";
import { key } from "../../utils/exportItem";
import InputLocation from "../../Components/Map/InputLocation/InputLocation";
import MainNavigation from "../../Components/Navigation/MainNavigation";
import { useAppState } from "../../utils/Hooks/useAppState";
import { PostPlaces } from "../../lib/Actions/ServerPostActions/PostPlaces";
import { Input, Button } from "@chakra-ui/react";
const Trips = () => {
  const { state, dispatch } = useAppState();
  const { itiInfo, placeValues } = state;

  const navigate = useNavigate();
  const itiId = short.generate();

  //state for form inputs
  const [destination, setDestination] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [errors, setErrors] = useState({});

  //validate function to validate form data
  const validateDestination = () => {
    const validationErrors = {};
    if (!destination.trim()) {
      validationErrors.destination = "Destination is required";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...validationErrors }));
  };
  // Validation function for dates
  const validateDates = () => {
    const validationErrors = {};

    if (!startDate) {
      validationErrors.startDate = "Start date is required";
    }

    if (!endDate) {
      validationErrors.endDate = "End date is required";
    }

    if (startDate && endDate && startDate > endDate) {
      validationErrors.dateRange = "End date must be after start date";
    } else {
      validationErrors.dateRange = "";
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...validationErrors }));
  };

  //function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    //validate the form data
    validateDestination();
    validateDates();

    if (
      !errors.destination &&
      !errors.startDate &&
      !errors.endDate &&
      startDate &&
      endDate &&
      startDate <= endDate
    ) {
      const pId = short.generate();

      const newPlaces = await PostPlaces(pId, {
        itineraryId: itiId,
        itiInfo,
        startDate,
        endDate,
      });

      if (newPlaces) {
        navigate(`/tripPlaces/${pId}`);
      }
    } else {
      console.log("Form validation failed");
    }
  };
  const handlePlaceValue = (value) => {
    const placevalueaction = {
      type: "ADD_PLACE_VALUE",
      payload: value,
    };
    dispatch(placevalueaction);
  };
  return (
    <>
      <MainNavigation />
      <div className="trips">
        <h2>Plan a New Trip</h2>
        <form onSubmit={handleSubmit} className="trips-form">
          <div className="destination-input">
            <label className="destination-label">Destination:</label>
            <Input
              type="text"
              value={placeValues}
              onChange={(e) => {
                setDestination(e.target.value);
                handlePlaceValue(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, destination: "" }));
              }}
              onBlur={validateDestination}
              placeholder="e.g pokhara,Kathmandu,Mustang"
            />
            {errors.destination && (
              <div className="error-message">{errors.destination}</div>
            )}
          </div>
          {placeValues && (
            <InputLocation apiKey={key} destination={placeValues} />
          )}

          <br />

          <div className="date-input">
            <label className="date-label">Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setErrors((prevErrors) => ({ ...prevErrors, startDate: "" }));
              }}
              onBlur={validateDates}
              dateFormat="MM/dd/yyyy"
              isClearable
              placeholderText="Select Start Date"
              showTimeInput={false}
            />

            {errors.startDate && (
              <div className="error-message">{errors.startDate}</div>
            )}
            <label className="date-label">End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => {
                setEndDate(date);
                setErrors((prevErrors) => ({ ...prevErrors, endDate: "" }));
              }}
              onBlur={validateDates}
              dateFormat="MM/dd/yyyy"
              isClearable
              placeholderText="Select End Date"
            />
            {errors.endDate && (
              <div className="error-message">{errors.endDate}</div>
            )}
          </div>
          <br />
          {errors.dateRange && (
            <div className="error-message">{errors.dateRange}</div>
          )}

          <Button colorScheme=" #45a049" className="trips-button" type="submit">
            Plan Trip
          </Button>
        </form>
      </div>
    </>
  );
};

export default Trips;
// import { useState } from "react";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Heading,
//   Input,
//   Flex,
//   useColorModeValue // Import Flex component from Chakra UI
// } from "@chakra-ui/react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import short from "short-uuid";
// import { key } from "../../utils/exportItem";
// import InputLocation from "../../Components/Map/InputLocation/InputLocation";
// import MainNavigation from "../../Components/Navigation/MainNavigation";
// import { useAppState } from "../../utils/Hooks/useAppState";
// import { PostPlaces } from "../../lib/Actions/ServerPostActions/PostPlaces";
// import Footer from "../../Components/Footer/Footer";

// const Trips = () => {
//   const { state, dispatch } = useAppState();
//   const { itiInfo, placeValues } = state;

//   const itiId = short.generate();

//   // State for form inputs
//   const [destination, setDestination] = useState("");
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [errors, setErrors] = useState({});

//   // Validate function to validate form data
//   const validateDestination = () => {
//     const validationErrors = {};
//     if (!destination.trim()) {
//       validationErrors.destination = "Destination is required";
//     }
//     setErrors((prevErrors) => ({ ...prevErrors, ...validationErrors }));
//   };

//   // Validation function for dates
//   const validateDates = () => {
//     const validationErrors = {};

//     if (!startDate) {
//       validationErrors.startDate = "Start date is required";
//     }

//     if (!endDate) {
//       validationErrors.endDate = "End date is required";
//     }

//     if (startDate && endDate && startDate > endDate) {
//       validationErrors.dateRange = "End date must be after start date";
//     } else {
//       validationErrors.dateRange = "";
//     }

//     setErrors((prevErrors) => ({ ...prevErrors, ...validationErrors }));
//   };

//   // Function to handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Validate the form data
//     validateDestination();
//     validateDates();

//     if (
//       !errors.destination &&
//       !errors.startDate &&
//       !errors.endDate &&
//       startDate &&
//       endDate &&
//       startDate <= endDate
//     ) {
//       const pId = short.generate();

//       const newPlaces = await PostPlaces(pId, {
//         itineraryId: itiId,
//         itiInfo,
//         startDate,
//         endDate,
//       });

//       if (newPlaces) {
//         // Navigate to the trip places page
//         navigate(`/tripPlaces/${pId}`);
//       }
//     } else {
//       console.log("Form validation failed");
//     }
//   };

//   // Function to handle changes in the place value
//   const handlePlaceValue = (value) => {
//     const placevalueaction = {
//       type: "ADD_PLACE_VALUE",
//       payload: value,
//     };
//     dispatch(placevalueaction);
//   };
//   const bgColor = useColorModeValue("gray.100", "gray.800");

//   return (
//     <Flex
//     minH="100vh"
//     maxW="100%"
//     align="center"
//     bg={bgColor}
//     flexDirection="column"
//     position="relative"
//   >
//     <MainNavigation />
//     <Box
//       className="trips"
//       maxW="100%" // Adjusted to occupy entire width
//       mx="auto"
//       mt="1rem"
//       p="20px"
//       boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
//     >
 
//       <Heading as="h2" textAlign="center" mb="1rem">
//         Plan a New Trip
//       </Heading>
//       <form onSubmit={handleSubmit} className="trips-form">
//         <FormControl isInvalid={errors.destination} width="100%">
//           <FormLabel htmlFor="destination">Destination:</FormLabel>
//           <Input
//             id="destination"
//             type="text"
//             value={placeValues}
//             onChange={(e) => {
//               setDestination(e.target.value);
//               handlePlaceValue(e.target.value);
//               setErrors((prevErrors) => ({
//                 ...prevErrors,
//                 destination: "",
//               }));
//             }}
//             onBlur={validateDestination}
//             placeholder="e.g pokhara,Kathmandu,Mustang"
//           />
//           {errors.destination && (
//             <Box color="red.500" mt="2px">
//               {errors.destination}
//             </Box>
//           )}
//         </FormControl>
//         <InputLocation apiKey={key} destination={placeValues} />
//         <Flex justifyContent="space-between" width="100%">
//           <FormControl isInvalid={errors.startDate} width="48%">
//             <FormLabel htmlFor="startDate">Start Date:</FormLabel>
//             <DatePicker
//               id="startDate"
//               selected={startDate}
//               onChange={(date) => {
//                 setStartDate(date);
//                 setErrors((prevErrors) => ({
//                   ...prevErrors,
//                   startDate: "",
//                 }));
//               }}
//               onBlur={validateDates}
//               dateFormat="MM/dd/yyyy"
//               isClearable
//               placeholderText="Select Start Date"
//               showTimeInput={false}
//             />
//             {errors.startDate && (
//               <Box color="red.500" mt="2px">
//                 {errors.startDate}
//               </Box>
//             )}
//           </FormControl>
//           <FormControl isInvalid={errors.endDate} width="48%">
//             <FormLabel htmlFor="endDate">End Date:</FormLabel>
//             <DatePicker
//               id="endDate"
//               selected={endDate}
//               onChange={(date) => {
//                 setEndDate(date);
//                 setErrors((prevErrors) => ({
//                   ...prevErrors,
//                   endDate: "",
//                 }));
//               }}
//               onBlur={validateDates}
//               dateFormat="MM/dd/yyyy"
//               isClearable
//               placeholderText="Select End Date"
//             />
//             {errors.endDate && (
//               <Box color="red.500" mt="2px">
//                 {errors.endDate}
//               </Box>
//             )}
//           </FormControl>
//         </Flex>
//         {errors.dateRange && (
//           <Box color="red.500" mt="2px">
//             {errors.dateRange}
//           </Box>
//         )}
//         <Button
//           type="submit"
//           colorScheme="green"
//           mt="1rem"
//           width="100%"
//           variant="solid"
//         >
//           Plan Trip
//         </Button>
//       </form>
//     </Box>
//       <Footer />
// </Flex>
//   );

// };

// export default Trips;
