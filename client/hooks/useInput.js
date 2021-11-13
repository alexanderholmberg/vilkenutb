import { useState } from "react";

export const useInput = initialValues => {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    e => {
      console.log(e.target.value)
      console.log(e.target.name)
      setValues({
        ...values,
        [e.target.name]: e.target.value
      })
    }
  ]
};