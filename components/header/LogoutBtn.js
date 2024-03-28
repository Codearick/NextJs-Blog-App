import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '@/app/store/slices/authSlice'
import authService from '@/app/appwrite/auth'
import {useRouter} from 'next/navigation'


const LogoutBtn = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const logoutHandler = async () => {
        try {
            await authService.logout();
            dispatch(logout());
            router.push("/");

        } catch (error) {
            console.log("Error logging out: ", error.message)
        }
    }

    return (
        <div>
            <button 
            className='inline-block px-6 py-2 duration-200 hover:bg-red-500 rounded-2xl'
            onClick={logoutHandler}
            >Logout</button>
        </div>
    )
}

export default LogoutBtn
