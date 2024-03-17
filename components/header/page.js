import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

const page = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const router = useRouter()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='py-3 shadow bg-gray-300'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link href={"/"}>
              <Logo  width="700px"/>
            </Link>
          </div>
        <ul className='flex ml-auto text-slate-600 text-lg font-[400]'>
          {navItems.map((item) => 
          item.active ? (
            <li key={item.name}>
              <button
              onClick={() => router.push(item.slug)}
              className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
              >{item.name}</button>
            </li>
          ) : (null)
          )}
          {
            authStatus && (<li><LogoutBtn/></li>)
          }
        </ul>
        </nav>
      </Container>
    </header>
  )
}

export default page