import React from 'react'
import {useState, useEffect} from 'react'
import { UseSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

const Protected = ({children, authentication = true}) => {

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() =>{
        if(authentication && authStatus !== authentication){
            router.push("/login")
        }
        else if(!authentication && authStatus !== authentication){
            router.push("/")
        }
        setLoading(false);
    },[authStatus, router, authentication])

  return <div></div>
}

export default Protected