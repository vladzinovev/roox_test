import { useEffect, useState } from "react";

export const useValidation = (value: string, validations: any) => {
    const [isEmpty, setEmpty] = useState(false);
    const [minLengthError, setMinLengthError] = useState(false);
    const [maxLengthError, setMaxLengthError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [inputValid, setInputValid] = useState(true);
  
    useEffect(() => {
      for (const validation in validations) {
        switch (validation) {
          case "minLength":
            value.length < validations[validation]
              ? setMinLengthError(true)
              : setMinLengthError(false);
            break;
          case "empty":
            value ? setEmpty(false) : setEmpty(true);
            break;
          case "maxLength":
            value.length > validations[validation]
              ? setMaxLengthError(true)
              : setMaxLengthError(false);
            break;
          case "email":
            const re =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            re.test(String(value).toLowerCase())
              ? setEmailError(false)
              : setEmailError(true);
            break;
        }
      }
    }, [value]);
  
    useEffect(() => {
      if (isEmpty || maxLengthError || minLengthError || emailError) {
        setInputValid(false);
      } else {
        setInputValid(true);
      }
    }, [isEmpty, maxLengthError, minLengthError, emailError]);
  
    return {
      isEmpty,
      minLengthError,
      emailError,
      maxLengthError,
      inputValid,
    };
  };