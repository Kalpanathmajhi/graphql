import './App.css'
import { gql, useQuery } from '@apollo/client'

const query = gql `
query getTodoWithUser {
  getTodos {
    title
    completed
    user {
      name
      email
    }
   
  }
}`;

function App() {
const {data, loading,error} = useQuery(query)
   if (loading) return <h1>Loading...</h1>
   if (error) return <h1>Error: {error.message}</h1>
  return (
    <>
    {JSON.stringify(data)}
    </>
  )
}

export default App
