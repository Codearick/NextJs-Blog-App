"use client"

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
      slug: "/all-blogs",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='sticky top-0 z-50 py-3  shadow bg-slate-800'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link href={"/"}>
              <Logo width="700px" />
            </Link>
          </div>
          <div className="ml-auto flex items-center justify-between">
            <ul className="flex sm:space-x-7 space-x-3 md:mr-2">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}
                  >
                    <button
                      onClick={() => router.push(item.slug)}
                      className={`inline-block px-5 py-2 text-lg duration-200 ${router.pathname === item.slug ? 'underline hover:text-white' : 'hover:underline hover:text-white text-text'}`}
                    >{item.name}
                    </button>
                  </li>
                ) : null
              )}
            </ul>
            { (
              <li className="list-none rounded-full text-text md:hover:bg-accent hover:text-background">
                <LogoutBtn />
              </li>
            )}
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default page