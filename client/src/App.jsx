import { useState } from 'react'
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
const {data, loading} = useQuery(query)
   if (loading) return <h1>Loading...</h1>
  return (
    <>
    {JSON.stringify(data)}
    </>
  )
}

export default App
