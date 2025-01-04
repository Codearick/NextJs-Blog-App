"use client"

import React from 'react'
import Link from 'next/link'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-slate-800">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="100px" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-300">
                                    &copy; Copyright 2024. Made with ❤️ by Rohan.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-x font-semibold uppercase text-gray-300 ">
                                Company
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-300 hover:text-white hover:underline"
                                        href="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-300 hover:text-white hover:underline"
                                        href="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-300 hover:text-white hover:underline"
                                        href="/"
                                    >
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-slate-300 hover:text-white hover:underline"
                                        href="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-x font-semibold uppercase text-gray-300 ">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-300 hover:text-white hover:underline"
                                        href="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-300 hover:text-white hover:underline"
                                        href="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-300 hover:text-white hover:underline"
                                        href="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-slate-300 hover:text-white hover:underline"
                                        href="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-x font-semibold uppercase text-gray-300 ">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-300 hover:text-white hover:underline"
                                        href="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-slate-300 hover:text-white hover:underline"
                                        href="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-slate-300 hover:text-white hover:underline"
                                        href="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Footer