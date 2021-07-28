import { useState } from "react";


export function useForm<T extends Record<string, string>>(defaults: T) {
    const [data, setData] = useState(defaults)
  
    const setForm = (field: string, value: string) => {
      setData({ ...data, [field]: value })
    }
  
    return { form: data, setForm }
  }