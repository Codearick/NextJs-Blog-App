"use client"
// import Config from "@/app/config/config";
import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import {login, logout} from './store/slices/authSlice'
import Header from '@/components/Header/page'
import Footer from '@/components/Footer/Footer'


export default function Home() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      } else{
        dispatch(logout())
      }
    })
    .catch(error =>{console.log(error.messsage)})
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
      <Header/>
        <main>
         TODO: 
        </main>
      <Footer />
      </div>
    </div>
  ) : null
}

