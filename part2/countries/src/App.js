import { useState, useEffect } from 'react'
import axios from 'axios'
function App() {
  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setSearchTerm(response.data)
        console.log(response.data)
      })
  }, [])
  const Information = () => {

  }

  const onSearchChange = (event) => setSearchTerm(event.target.value)
  return (
    <>
      find countries
      <input onChange={onSearchChange}></input>
      <div>
        <Information />
      </div>
    </>

  );
}

export default App;
