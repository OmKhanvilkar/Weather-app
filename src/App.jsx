import { useState } from 'react'
import './App.css'

function App() {
  const [Report, setReport] = useState('')
  const [value, setvalue] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setvalue(e.target.value);
  }

  const generateReport = async () => {
    try {
      const res = await fetch(`your-own-api-key`)
      const data = await res.json();

      if (data.error) {
        setError("City Not Found");
        setvalue('')
        setReport('')
      }
      else {
        setReport(data);
        console.log(data);
        setError('')
      }
    }
    catch (err) {
      setError("Failed to fetch weather report")
    }
  }

  const ResetData=()=>{
    setvalue('')
    setReport('')
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen p-4'>
        <div className='bg-white/20 backdrop-blur-lg p-6 rounded-lg shadow-lg w-full max-w-md'>
          <label className='flex flex-col items-center mb-4 text-lg text-white'>
            Enter City Name:
            <input
              className='mt-2 w-full bg-white text-black border-none rounded-md p-2 outline-none focus:ring-2 focus:ring-yellow-400'
              value={value} onChange={handleChange} />
          </label>
          <button onClick={generateReport}
            className='w-full bg-yellow-400 text-black font-semibold py-2 rounded-md hover:bg-yellow-500 transition'>
            Search Weather Report
          </button>
        </div>

        {error && <p className='text-red-500 font-semibold mt-4'>{error}</p>}

        {Report && (
          <div className='mt-6 p-6 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg text-white max-w-md w-full text-center'>
            <h1 className='text-2xl font-bold'>{Report.location.name}, {Report.location.region}</h1>
            <p className='text-lg'>Temperature: {Report.current.temp_c}°C / {Report.current.temp_f}°F</p>
            <p>Humidity: {Report.current.humidity}%</p>
            <p className='mt-2 font-semibold'>Condition: {Report.current.condition.text}</p>
            <img className='mx-auto mt-2' src={Report.current.condition.icon} alt="Weather Condition"/>
            <p className='text-sm mt-2'>Country: {Report.location.country}</p>
            <p className='text-sm'>Last Updated: {Report.current.last_updated}</p>
            <button onClick={ResetData}
              className='w-full bg-yellow-400 text-black font-semibold py-2 rounded-md mt-2 hover:bg-yellow-500 transition'>
              Reset
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default App;
