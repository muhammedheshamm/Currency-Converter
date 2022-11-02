import { useEffect, useState } from 'react'
import Row from './components/Row'


const BASE_URL ="https://api.apilayer.com/exchangerates_data/latest"
const myHeaders = new Headers();
myHeaders.append("apikey", "0gnO4y2ow3KiV4IgaTFWOu7IkWlLFFLa");
const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
}



function App() {
  const [options,setOptions] = useState([])
  const [from , setFrom] = useState()
  const [to , setTo] = useState()
  const [rate , setRate] =useState()
  const [amount, setAmount] =useState(1)
  const [amountInFrom ,setAmountInFrom] = useState(true) 
  const [all ,setAll] =useState({})
  let toAmount ,fromAmount
  if(amountInFrom){
    fromAmount= amount 
    toAmount= (amount*rate) || 0
  }
  else{
    fromAmount=(amount/rate)
    toAmount=amount
  }
  
  useEffect(()=>{
    fetch(BASE_URL, requestOptions)
      .then(response => response.json())
      .then(data => {
        setAll({...data.rates})
        setOptions([...Object.keys(data.rates)])
        setFrom(data.base)
        setTo(Object.keys(data.rates)[0])
        setRate(data.rates[Object.keys(data.rates)[0]])
    })

  },[])

  useEffect(()=>{
    if(from!=null && to!=null){
      setRate(all[to]/all[from])
    }
  },[to ,from ,all])

  function handleFromChange(e){
    setAmount(e.target.value)
    setAmountInFrom(true)
  }

  function handleToChange(e){
    setAmount(e.target.value)
    setAmountInFrom(false)
  }
  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <Row options={options} selected={from} 
      handleChange={e=>setFrom(e.target.value)}
      amount={fromAmount}
      onChangeAmount={handleFromChange}
      />
      <div className='eq'>=</div>
      <Row options={options} selected={to}
      handleChange={e=>setTo(e.target.value)}
      amount={toAmount}
      onChangeAmount={handleToChange}
      />
    </div>
  )
}

export default App

