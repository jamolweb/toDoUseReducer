import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text
} from "@chakra-ui/react"
import { useReducer } from "react"

const App = () => {

  let reducer = (state, action) => {
    switch (action.type) {
      case 'newJob':
        return {
          ...state,
          job: action.payload,
        }
      case 'add':
        return {
          jobs: [...state.jobs, state.job],
          inputValue: 'something',
        }
      case 'remove':
        return {
          jobs: state.jobs.filter((_, index) => index !== action.id)
        }
      default:
        return state;
    }
  }

  let [todo, dispatch] = useReducer(reducer, { job: '', jobs: []})
  return (
    <Box color={'red'} bg={'black'} w={'100%'} h={'100vh'}>
      <Container pt={'100'}>
        <Heading mb={'10px'} size={{base:'sm', sm:'md', md:'lg', lg:'xl'}} textAlign={'center'}>
          Welcome to your todo list:
        </Heading>
        <Flex>
          <Input borderRadius={'10px 0 0 10px'} onChange={(e) => dispatch({
            type: 'newJob',
            payload: e.target.value,
          })} type="text" placeholder="new job" />
          <Button borderRadius={'0 10px 10px 0'} onClick={() => dispatch({ type: 'add' })}>+ add</Button>
        </Flex>
      </Container>
      <Container mt={'10px'}>
        {
          todo.jobs?.map((job, i) => {
            return (
              job === undefined ? '' : <Flex alignItems={'center'} key={i} justifyContent={'space-between'} mt={'5px'}>
                <Text>
                  {
                    job
                  }
                </Text>
                <Button onClick={() => dispatch({ type: 'remove', id: i })} colorScheme="red">
                  remove
                </Button>
              </Flex>
            )
          })
        }
      </Container>
    </Box>
  )
}

export default App