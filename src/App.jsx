import { useState } from 'react'
import './App.css'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import { InputBox } from './components/index.js'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div className='w-full h-screen flex flex-wrap 
    justify-center items-center bg-cover bg-no-repeat'
      style={{ backgroundImage: `url(https://images.pexels.com/photos/1114620/pexels-photo-1114620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)` }}>
      <div className='w-2/5'>
        <div className='w-full  mx—auto border p-7  rounded—lg  backdrop—blur—sm
bg-black/60'>
          <form onSubmit={(e) => {
            e.preventDefault()
            convert()
          }}>
            <div className='w-full mb-0.5 '>
              <InputBox
                label="from"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectedCurrency={from}
              />
            </div>
            <div className='w-full h-auto'>
              <button className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2  border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'
                onClick={swap}
              >Swap</button>
            </div>
            <div className='w-full mb-1 '>
              <InputBox
                label="to"
                currencyOptions={options}
                amount={convertedAmount}
                onCurrencyChange={(currency) => setTo(currency)}
                selectedCurrency={to}
                amountDisabled
              />
            </div>
            <button
              type="submit"
              className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg'>
              Convert  {from.toUpperCase()} to {to.toUpperCase()}</button>
          </form>

        </div>
      </div>

    </div>
  )
}

export default App
