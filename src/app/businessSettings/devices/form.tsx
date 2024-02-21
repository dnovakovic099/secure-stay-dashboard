"use client"
import React, { useState } from 'react'
import { envConfig } from '@/utility/environment'
import axios, { AxiosResponse } from 'axios'
import toast from 'react-hot-toast'

const Form = (props: any) => {
    const { closeModal } = props
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (value: string) => {
        setUsername(value)
    }
    const handlePasswordChange = (value: string) => {
        setPassword(value)
    }

    const handleSubmit = async () => {
        const apiUrl = `${envConfig.backendUrl}/device/sifely/getaccesstoken`
        if (username == '' || password == '') return toast.error('Please enter the credentials!')
        const axiosPromise: Promise<AxiosResponse<any>> = axios.post(apiUrl, { username, password });
        const responsePromise: Promise<any> = axiosPromise.then(response => {
            //store the access_token in the local storage          
            localStorage.setItem('sifely_access_token', response.data.access_token)
            localStorage.setItem('sifely_refresh_token', response.data.refresh_token)
            closeModal()
            window.location.reload()
        });
        toast.promise(responsePromise, {
            loading: 'Authenticating...',
            success: 'Successfully! authenticated',
            error: 'Something went wrong!',
        });
    }
    
    return (
        <div className=''>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
            </label>
            <input
                className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
            />
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                />
            </div>
            <div className="flex items-center justify-end mb-4">
                <button
                    onClick={() => handleSubmit()}
                    className="w-full rounded-full bg-blue-900 px-2 py-1 text-base font-medium  text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
                >
                    Sign In
                </button>
            </div>
        </div>
    )
}

export default Form