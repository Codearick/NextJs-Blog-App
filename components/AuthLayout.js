"use client"
import React from 'react'
import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

const AuthLayout = ({children, authentication = true}) => {

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

  return loading ? <h1>Loading...</h1> : <>{children}</>
}

export default AuthLayout