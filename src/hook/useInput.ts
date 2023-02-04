import {useEffect, useState } from "react";

import { IPost } from "../types/types";
import { useTypedSelector } from "./useTypedSelector";
import { useValidation } from "./useValidation";

export const useInput = (params: string | undefined, initialValue: string|number, validations: any) => {
  const { post } = useTypedSelector((store) => store.users);
  
  const [postItem, setPostItem] = useState<IPost>();
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>| React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    setDirty(true);
  };
  function getUserId() {
    setPostItem(post.find((post) => post.id === Number(params)));
  }

  useEffect(() => {
    getUserId();
  }, [params]);

  useEffect(() => {
    setValue(initialValue);
  }, [postItem]);

  return {
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};
