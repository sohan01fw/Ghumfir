import React, { useEffect, useState } from "react";
import "./Budget.css";
import { useParams } from "react-router-dom";
import { getAllBudget } from "../../../lib/Actions/ServerGetActions/getAllBudget";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Progress,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import EditModel from "../../ui/Budget/EditModel";
import ExpensesModel from "../../ui/Budget/ExpensesModel";
import { useAppState } from "../../../utils/Hooks/useAppState";
import EditExpenseModel from "../../ui/Budget/EditExpenseModel";
import { deleteExpenses } from "../../../lib/Actions/ServerPostActions/PostBudget";
const Budget = () => {
  const { state, dispatch } = useAppState();
  const { Budget, expense } = state;
  const { itiId, pId } = useParams();
  const [budgetValue, setbudgetValue] = useState();
  const [progressValue, setprogressValue] = useState(0);
  const [estExpense, setestExpense] = useState(0);
  const [delExp, setdelExp] = useState();
  const getBudgetdata = async () => {
    const fetchBudgetDetails = await getAllBudget(itiId);
    setbudgetValue(fetchBudgetDetails);
    if (fetchBudgetDetails) {
      const sumcost = fetchBudgetDetails?.expenses?.reduce(
        (accumulator, currenvalue) => {
          return accumulator + (currenvalue?.cost || 0);
        },
        0
      );
      setestExpense(sumcost);
      const calculateExpense = (sumcost / fetchBudgetDetails?.Budget) * 100;
      setprogressValue(calculateExpense);
    }
  };

  useEffect(() => {
    getBudgetdata();
  }, [itiId, Budget, expense, delExp]);
  //deleteExp
  const handleDeleteExp = async (id) => {
    const x = id?.expId;
    const deleteExp = await deleteExpenses(itiId, x);
    if (deleteExp) {
      setdelExp(deleteExp);
    }
  };
  return (
    <div className="budget-container">
      <Box width="80%" display="flex" justifyContent="space-between">
        <h1>Budgeting</h1>
        <Box>
          <ExpensesModel id={itiId} />
        </Box>
      </Box>

      <div className="display-budget-container">
        <div className="T-heading-budget">
          <p className="es-budget">Total Estimated Budget</p>
          <Box
            className="Totalbudget"
            display="flex"
            justifyContent="space-between"
          >
            <Box fontSize="18px">NPR {estExpense && estExpense}.00</Box>

            <Box
              display="flex"
              fontSize="11px"
              color="gray"
              fontWeight="700"
              paddingTop={2}
            >
              <Box>Budget:</Box>
              <Box>NPR {budgetValue?.Budget}.00</Box>
            </Box>
          </Box>
          <Box>
            <Progress
              value={progressValue}
              size="xs"
              colorScheme="green"
              hasStripe={true}
              isAnimated={true}
              backgroundColor="white"
            />
          </Box>
          <div className="edit-budget">
            <Box colorScheme="green" marginTop={4}>
              <EditModel id={itiId} />
            </Box>
          </div>
        </div>
      </div>
      {/* expenses section */}
      <Box className="e-heading" height="100vh">
        <Accordion
          defaultIndex={[0]}
          allowMultiple
          paddingTop={5}
          border="transparent"
          width="80%"
        >
          <AccordionItem>
            <h2>
              <AccordionButton width={"140px"} fontSize={20}>
                <AccordionIcon color={"gray"} paddingRight={"5px"} />
                <Box
                  color={"black"}
                  whiteSpace={"nowrap"}
                  fontWeight="700"
                  fontSize={17}
                >
                  Expenses
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <div className="expenses-list">
                {budgetValue?.expenses?.map((data, index) => {
                  return (
                    <Box key={index} margin={2} padding={1}>
                      <div className="budget-value" key={index}>
                        <EditExpenseModel data={data} />
                        <Box
                          cursor="pointer"
                          _hover={{ color: "red" }}
                          marginLeft={3}
                        >
                          <DeleteIcon
                            fontSize="22px"
                            paddingLeft={1}
                            paddingRight={1}
                            onClick={() => {
                              handleDeleteExp({ expId: data?._id });
                            }}
                          />
                        </Box>
                      </div>
                    </Box>
                  );
                })}
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </div>
  );
};

export default Budget;
