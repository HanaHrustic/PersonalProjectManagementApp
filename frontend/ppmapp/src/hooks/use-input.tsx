import { useState } from "react";

const useInput = (initialValue: any, validateValue: any) => {
    const [enteredValue, setEnteredValue] = useState(initialValue);
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (value: any) => {
        setEnteredValue(value);
    }

    const inputBlurHandler = (event: any) => {
        setIsTouched(true);
    }

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    }

    return {
      value: enteredValue,
      isValid: valueIsValid,
      hasError,
      valueChangeHandler,
      inputBlurHandler,
      reset
    };
}

export default useInput;