//Validates card number
const validateCardNumber = (cardNumber) => {

    //Make sure there are only numbers in card number
    let newCardNumber = formatNumberFields(cardNumber);
    const length = newCardNumber.length;

    //Prevent user from typing in incorrect card numbers from the start
    if (length === 0) return '';
    if (length === 1){
        if ((newCardNumber[0] !== '4') && (newCardNumber !== '3')){
            return '';
        }
    } 
    if (length === 2 && newCardNumber[0] === '3'){
        if ((newCardNumber[1] !== '4') && (newCardNumber[1] !== '7')){
            return newCardNumber[0];
        }
    }

    //Logic for Visa cards
    if (newCardNumber[0] === '4'){
        //Make sure card number is formatted correctly
        const partOne = newCardNumber.slice(0,4);
        const partTwo = newCardNumber.slice(4,8);
        const partThree = newCardNumber.slice(8,12);
        const partFour = newCardNumber.slice(12,16);

        if (length > 12){
            newCardNumber = `${partOne}-${partTwo}-${partThree}-${partFour}`;
        } else if (length > 8){
            newCardNumber = `${partOne}-${partTwo}-${partThree}`;
        } else if (length > 4){
            newCardNumber = `${partOne}-${partTwo}`;
        } else if (length > 0){
            newCardNumber = partOne;
        }

    //Logic for AMEX cards
    } else {
        //Make sure card number is formatted correctly
        const partOne = newCardNumber.slice(0,4);
        const partTwo = newCardNumber.slice(4,10);
        const partThree = newCardNumber.slice(10,15);

        if (length > 10){
            newCardNumber = `${partOne}-${partTwo}-${partThree}`;
        } else if (length > 4){
            newCardNumber = `${partOne}-${partTwo}`;
        } else if (length > 0){
            newCardNumber = partOne;
        }
    }

    return newCardNumber;
}

//Validates CVV2
const validateCVV2 = (cVV2) => {
    let newCVV2 = formatNumberFields(cVV2).slice(0,4);
    return newCVV2;
}

//Validates exp. month
const validateExpMonth = (expMonth) => {
    let newExpMonth = formatNumberFields(expMonth).slice(0,2);
    return newExpMonth;
}

//Validates exp. year
const validateExpYear = (expYear) => {
    let newExpYear = formatNumberFields(expYear).slice(0,4);
    return newExpYear;
}

//Determines card type (VISA or AMEX)
const determineCardType = (cardNumber) => {
    return (cardNumber[0] === '4') ? 'VISA' : 'AMEX';
}

//Determines if exp. date entered is valid or not
const checkIfExpDateValid = (expMonth, expYear) => {
    const parsedExpMonth = parseInt(expMonth, 10);
    const parsedExpYear = parseInt(expYear, 10);
    const d = new Date();
    const thisMonth = d.getMonth()+1;
    const thisYear = d.getFullYear();

    const monthIsValid = parsedExpMonth > 0 && parsedExpMonth < 13;
    const yearIsValid = parsedExpYear.toString().length === 4;
    const yearIsInPast = thisYear > parsedExpYear;
    const yearIsEqualToCurrent = thisYear === parsedExpYear;
    const monthIsInPast = thisMonth >= parsedExpMonth;
    if (yearIsInPast || !monthIsValid || !yearIsValid){
        return false;
    }
    if (yearIsEqualToCurrent){
        console.log(thisMonth)
        console.log(parsedExpMonth)
        if (monthIsInPast){
            return false;
        }
    }
    return true;
}

//Helper function for formatting number fields
const formatNumberFields = (input) => {
    const newInput = input.split('')
    .filter((char)=>{
        let charToInt = parseInt(char, 10);
        let isValid = (charToInt >= 0 && charToInt <= 9) ? true : false;
        return isValid;
    })
    .join('');
    return newInput;
}

export {validateCardNumber, validateCVV2, validateExpMonth, validateExpYear, determineCardType, checkIfExpDateValid};