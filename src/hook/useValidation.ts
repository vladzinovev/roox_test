import { useEffect, useState } from "react";

export const useValidation = (value: any, validations: any) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  
  const [nameError, setNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [streetError, setStreetError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [zipcodeError, setZipcodeError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [websiteError, setWebsiteError] = useState(false);

  const [inputValid, setInputValid] = useState(true);
  

  useEffect(() => {
    for (const validation in validations) {
        console.log(value)
      switch (validation) {
        case "minLength":
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
        case "maxLength":
          value.length > validations[validation]
            ? setMaxLengthError(true)
            : setMaxLengthError(false);
          break;
        case "isName":
            /^([a-zA-Z]{1,}.?\s?[a-zA-Z]{1,}\s[a-zA-Z]{1,})+$/.test(value)
            ? setNameError(false)
            : setNameError(true)
            break;
        case "isUsername":
            /^([a-zA-Z_?.?a-zA-Z]{3,})+$/.test(String(value))
            ? setUsernameError(false)
            : setUsernameError(true)
            break;
        case "isEmail":
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);
          break;
        case "isStreet":
            /^([a-zA-Z]{2,}\s[a-zA-Z]{2,})+$/.test(String(value))
            ? setStreetError(false)
            : setStreetError(true)
            break;
        case "isCity":
            /^([a-zA-Z]{2,}\s?[a-zA-Z]{2,})+$/.test(String(value))
            ? setCityError(false)
            : setCityError(true)
            break;
        case "isZipcode":
                /^([0-9-?0-9]{2,})+$/.test(value)
                ? setZipcodeError(false)
                : setZipcodeError(true)
                break;
        case "isPhone":
                /^([0-9-.()x ]{2,})+$/.test(value)
                ? setPhoneError(false)
                : setPhoneError(true)
            break;
        case "isWebsite":
            /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(value)
            ? setWebsiteError(false)
            : setWebsiteError(true)
        break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || maxLengthError || minLengthError || emailError || nameError|| usernameError||streetError||cityError||zipcodeError||phoneError||websiteError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, maxLengthError, minLengthError, emailError,nameError,usernameError,streetError,cityError,zipcodeError,phoneError,websiteError]);

  return {
    value,
    isEmpty,
    minLengthError,
    emailError,
    maxLengthError,
    inputValid,
    nameError,
    usernameError,
    streetError,
    cityError,
    zipcodeError,
    phoneError,
    websiteError

  };
};
