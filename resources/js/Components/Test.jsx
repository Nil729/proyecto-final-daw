function App() {
    const [count, setCount] = useState(0)
  
    // make a fech request to the backend
    const getBackendData = async () => {
      
      const response = await fetch('http://localhost/api/viatges')
      const data = await response.json()
      console.log(data)
    }
    const changeState = () => {
      setCount((count) => count + 1)
      getBackendData()
    }
    
    return (
      <>
        <h1>tesst</h1>
        <div className="card">
          <button onClick={changeState}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
      </>
    )
  }
  
  export default App