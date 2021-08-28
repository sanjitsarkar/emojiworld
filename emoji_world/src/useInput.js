import {useState} from 'react'

const useInput = (initialValue) => {
const [value, setValue] = useState(initialValue)
const set =  (_value) =>
{
    setValue(_value)
} 
const reset = ()=>{
    setValue(initialValue)
}
   const bind = {
       value,
       onChange:(e)=>{ setValue(e.target.value) }
   }

   return [value,bind,set,reset]
}

export default useInput
