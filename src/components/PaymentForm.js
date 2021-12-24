import { useState } from 'react';
import cardOptionsImage from '../assets/card-options-image.png';
import { validateCardNumber, validateCVV2, validateExpMonth, validateExpYear, determineCardType, checkIfExpDateValid} from '../utils/utils';

const PaymentForm = () => {
  //Holds state for credit card information
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cVV2, setCVV2] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');

  //Holds state for highlight colors depending on if input is valid or not
  const [nameIsValidHighlight, setNameIsValidHighlight] = useState('lightgrey');
  const [cardNumberIsValidHighlight, setCardNumberIsValidHighlight] = useState('lightgrey');
  const [cVV2IsValidHighlight, setCVV2IsValidHighlight] = useState('lightgrey');
  const [expMonthIsValidHighlight, setExpMonthIsValidHighlight] = useState('lightgrey');
  const [expYearIsValidHighlight, setExpYearIsValidHighlight] = useState('lightgrey');

  //Handle submission of form by displaying alert with entered information
  const handleSubmit = (e) => {

    e.preventDefault();
    let containsError = false;
    const cardType = determineCardType(cardNumber);
    let errors = [];

    if ((cardNumber.length != 19 && cardType == 'VISA') || (cardNumber.length != 17 && cardType == 'AMEX')){
      setCardNumberIsValidHighlight('red');
      containsError = true;
      errors.push('- Card number entered is not valid');
    } if ((cVV2.length != 3 && cVV2.length != 4) || (cardType == 'VISA' && cVV2.length != 3) || (cardType == 'AMEX' && cVV2.length != 4)){
      setCVV2IsValidHighlight('red');
      containsError = true;
      errors.push('- CVV2 entered is not valid.');
    } if (!(checkIfExpDateValid(expMonth, expYear))){
      setExpMonthIsValidHighlight('red');
      setExpYearIsValidHighlight('red');
      containsError = true;
      errors.push('- Expiration date entered is not valid.');
    }
    
    let output = '';
    if (containsError){
      output = 'Please fix the highlighted fields.';
      for (const error of errors){
        output += `\n${error}`;
      }
    } else {
      output = 
        `Success! You submitted this information:
        Name: ${name}
        Card Number: ${cardNumber}
        CVV2: ${cVV2}
        Exp. Month: ${expMonth}
        Exp. Year: ${expYear}`;
      setName('');
      setCardNumber('');
      setCVV2('');
      setExpMonth('');
      setExpYear('');
    }
    alert(output);
  }

  //Handle input changes for card number
  const handleCardNumberChange = (e) => {
    e.preventDefault();
    const currentCardNumber = validateCardNumber(e.target.value);
    const cardType = determineCardType(currentCardNumber);
    setCardNumber(currentCardNumber);
    if (cardNumberIsValidHighlight == 'red') setCardNumberIsValidHighlight('lightgrey');
  }

  //Handle input changes for CVV2
  const handleCVV2Change = (e) => {
    e.preventDefault();
    const currentCVV2 = validateCVV2(e.target.value);
    const cardType = determineCardType(cardNumber);
    setCVV2(currentCVV2);
    if (cVV2IsValidHighlight == 'red') setCVV2IsValidHighlight('lightgrey');
  }

  //Handle input changes for exp. month
  const handleExpMonthChange = (e) => {
    e.preventDefault();
    const currentExpMonth = validateExpMonth(e.target.value);
    setExpMonth(currentExpMonth);
    if (expMonthIsValidHighlight == 'red'){
      setExpMonthIsValidHighlight('lightgrey')
      if (expYearIsValidHighlight == 'red'){
        setExpYearIsValidHighlight('lightgrey');
      }
    }
  }

  //Handle input changes for exp. year
  const handleExpYearChange = (e) => {
    e.preventDefault();
    const currentExpYear = validateExpYear(e.target.value);
    setExpYear(currentExpYear);
    if (expYearIsValidHighlight == 'red'){
      setExpYearIsValidHighlight('lightgrey');
      if (expMonthIsValidHighlight == 'red'){
        setExpMonthIsValidHighlight('lightgrey');
      }
    }
  }

  return (
    <div id='widget-container'>
        <h3>Enter your credit card information</h3>
        <form id='card-form' onSubmit={handleSubmit}>
            <input id='card-name-field' name='card-name-field' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} required style={{borderColor: nameIsValidHighlight}}></input>
            <input id='card-number-field' name='card-number-field' placeholder='Card Number' value={cardNumber} onChange={handleCardNumberChange} required style={{borderColor: cardNumberIsValidHighlight}}></input>
            <input id='card-cvv2-field' name='card-cvv2-field' placeholder='CVV2' value={cVV2} onChange={handleCVV2Change} required style={{borderColor: cVV2IsValidHighlight}}></input>
            <input id='card-exp-month-field' name='card-exp-month-field' placeholder='Exp. Month' value={expMonth} onChange={handleExpMonthChange} required style={{borderColor: expMonthIsValidHighlight}}></input>
            <input id='card-exp-year-field' name='card-exp-year-field' placeholder='Exp. Year' value={expYear} onChange={handleExpYearChange} required style={{borderColor: expYearIsValidHighlight}}></input>
            <img id='card-options-image' name='card-options-image' src={cardOptionsImage} alt='credit card options'></img>
            <input id='card-submit-button' name='card-submit-button' type='submit' value='Submit'></input>
        </form>
    </div>
  );
}

export default PaymentForm;
