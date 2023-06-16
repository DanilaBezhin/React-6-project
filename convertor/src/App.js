import React, { useState, useEffect, useRef } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = useState('RUB')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(1)

  // const [rates, setRates] = useState({})
  const ratesRef = useRef({})

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
    .then((res) => res.json())
    .then((json) => {
      // setRates(json.rates);
      ratesRef.current = json.rates
      onChangeToPrice(1);
    })
    .catch((err) => {
      console.warn(err);
      alert('Не удалось получить информацию с сервера');
    })
  }, [])

  const onChangeFromPrice = (value) => {
    ratesRef.current['RUB'] = 1;
    let ratFromCur = ratesRef.current[fromCurrency]
    let ratToCur = ratesRef.current[toCurrency]

    let price = value / ratFromCur
    const result = price * ratToCur

    setFromPrice(value)
    setToPrice(result.toFixed(3))
  }

  const onChangeToPrice = (value) => {
    ratesRef.current['RUB'] = 1;
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice(result.toFixed(3))
    setToPrice(value)
  }

  useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency])

  useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency])

  return (
    <div className="App">
      <Block 
      value={fromPrice} 
      currency={fromCurrency} 
      onChangeCurrency={setFromCurrency} 
      onChangeValue={onChangeFromPrice}/>
      <Block 
      value={toPrice} 
      currency={toCurrency} 
      onChangeCurrency={setToCurrency} 
      onChangeValue={onChangeToPrice}/>
    </div>
  );
}

export default App;
