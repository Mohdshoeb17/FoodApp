import {toast} from 'react-toastify'

export const handleSuccess=(msg)=>{
    toast.success((msg),{
        possition:'top-right'
    })
}
export const handleError=(msg)=>{
    toast.error((msg),{
        possition:'top-right'
    })
}