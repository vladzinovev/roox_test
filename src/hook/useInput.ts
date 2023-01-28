import { useState } from "react";
import { useValidation } from "./useValidation";

export const useInput = (initialValue: any, validations: any) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);
  console.log(value)

  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    setDirty(true);
  };
  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};
