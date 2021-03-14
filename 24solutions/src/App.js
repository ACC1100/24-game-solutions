import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
  HStack,
  Input,
  Button,
  Center,
  ButtonGroup,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import {useState,useEffect} from 'react';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"

function App() {
  const [data,setData]=useState([]);
  const getData=()=>{
    fetch('solutions.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setData(myJson)
      });
  }
  useEffect(()=>{
    getData()
  },[])

  const [input, setInput]=useState("");
  function resetInputField () {
    document.getElementById("inputField").value = "";
    setInput("")
    setSolution([])
    // reset solutions as well
  }

  const [solution,setSolution]=useState([]);
  function findSolutions() {
    var inputString = input;
    if (inputString.length == 0) {
      return
    }

    var inputArray = inputString.trim().split(" ");
    inputArray = inputArray.sort().slice(-4); // take last 4 items, incase multiple spaces present
    inputArray = inputArray.map(Number).sort((a, b) => a - b).map(String); // stupid javascript sort needs this for numbers;
    inputString = inputArray.join(" ");

    for (var i=0;i<data.length;i++) {
      if (data[i].combination == inputString){
        setSolution(data[i].solutions);
        return
      }
    }
    setSolution([]);
  }
  function displaySolutions(solution) {
    var solutionItems = [];
    
    if (solution.length > 0) {
      for (var i=0; i<solution.length;i++) {
        solutionItems.push(
          <Tr key={i}>
            <Td>{solution[i]}</Td>
          </Tr>
        )
      }
    } else if (input != "") {
      solutionItems.push(
        <Tr key="none">
          <Td>No solution</Td>
        </Tr>
      )
    }


    return (
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Results</Th>
          </Tr>
        </Thead>

        <Tbody>
          {solutionItems}
        </Tbody>
      </Table>
    )
  }

  // INSANE! This runs findSolutions() every time input changes
  // also works as a "callback" like in useState/setState but in function form
  useEffect(() => {
    findSolutions();
  }, [input]);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <HStack spacing="80vw" justify="center">
          <Text>24 Solutions</Text>
          <ColorModeSwitcher justifySelf="flex-end" />
        </HStack>

      
        <Grid minH="80vh" p={3}>
          <Center>
            <VStack spacing={8}>
              <Input w="50vw" size="lg" id="inputField"
              placeholder="Input numbers here, in the following format: 1 2 3 4" 
              onChange={(e) => {setInput(e.target.value)}}
              />

              <ButtonGroup>
                <Button colorScheme="teal" size="lg" variant="outline"
                  onClick={() => {findSolutions()}}
                >
                  Solve
                </Button>
                <Button colorScheme="teal" size="lg" variant="ghost"
                  onClick={() => {resetInputField()}}
                >
                  Clear
                </Button>
              </ButtonGroup>

              {displaySolutions(solution)}

            </VStack>
          </Center>
        </Grid>
        
      </Box>
    </ChakraProvider>
  );
}

export default App;
