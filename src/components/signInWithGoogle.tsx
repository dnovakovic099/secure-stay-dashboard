'use client';
import axiosInstance from "@/auth/axiosInstance";
import { envConfig } from "@/utility/environment";
import { supabase } from "@/utility/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import handleApiCallFetch from "./handleApiCallFetch";


const SignInWithGoogle = () => {


    const router = useRouter();

    const loginWithGoogle = async () => {
        try {
            await supabase.auth.signInWithOAuth({
                provider: 'google'
            });

        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };



    const googleLoginRequest = async (email: string, uid: string) => {
        try {
            const response: any = await axiosInstance.get(`${envConfig.backendUrl}/users/check_user_google_login?email=${email}&uid=${uid}`);

            if (response?.status == 200) {
                return (response.data.success);
            }
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        const getGoogleSession = async () => {
            try {
                const data: any = await supabase.auth.getSession();

                if (data?.data?.session?.user?.app_metadata?.provider == "google") {

                    const userData = data?.data?.session?.user?.user_metadata;
                    const email: string = data?.data?.session?.user?.email?.toString();
                    const uid: string = data?.data?.session?.user?.id?.toString();


                    const userExist = await googleLoginRequest(email, uid);

                    if (userExist == true) {
                        router.push('/login');
                    }
                    if (userExist == false) {

                        const nameParts = userData?.full_name?.split(" ");
                        const firstName = nameParts[0];
                        const lastName = nameParts.slice(1).join(" ");
                        const companyName = "";
                        const numberofProperties = "";
                        const message = "Google SigUp";

                        const requestBody = { uid, email, firstName, lastName, companyName, numberofProperties, message };

                        const apiUrl = `${envConfig.backendUrl}/users/create`;

                        const headers = {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        };
                        var params = { method: 'POST', headers: headers, body: JSON.stringify(requestBody) };

                        await handleApiCallFetch(apiUrl, params);
                    } else {
                        console.log('Something went wrong!!!');

                    }

                }
            } catch (error) {
                throw error;

            }

        };

        getGoogleSession();
    }, []);


    return (
        <div className="">
            <button
                type="button"
                onClick={() => loginWithGoogle()}
                className="flex text-gray-500 py-2 px-4  w-full justify-center rounded-md border bg-gradient-to-br font-medium focus:outline-none">
                <svg
                    className="mr-2"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="24" height="24" fill="white" />
                    <path
                        fill-rule="evenodd"
                        clipRule="evenodd"
                        d="M23.04 12.2615C23.04 11.446 22.9668 10.6619 22.8309 9.90918H12V14.3576H18.1891C17.9225 15.7951 17.1123 17.013 15.8943 17.8285V20.714H19.6109C21.7855 18.7119 23.04 15.7637 23.04 12.2615Z"
                        fill="#4285F4"
                    />
                    <path
                        fill-rule="evenodd"
                        clipRule="evenodd"
                        d="M11.9995 23.4998C15.1045 23.4998 17.7077 22.47 19.6104 20.7137L15.8938 17.8282C14.864 18.5182 13.5467 18.9259 11.9995 18.9259C9.00425 18.9259 6.46902 16.903 5.5647 14.1848H1.72266V17.1644C3.61493 20.9228 7.50402 23.4998 11.9995 23.4998Z"
                        fill="#34A853"
                    />
                    <path
                        fill-rule="evenodd"
                        clipRule="evenodd"
                        d="M5.56523 14.185C5.33523 13.495 5.20455 12.7579 5.20455 12C5.20455 11.242 5.33523 10.505 5.56523 9.81499V6.83545H1.72318C0.944318 8.38795 0.5 10.1443 0.5 12C0.5 13.8557 0.944318 15.612 1.72318 17.1645L5.56523 14.185Z"
                        fill="#FBBC05"
                    />
                    <path
                        fill-rule="evenodd"
                        clipRule="evenodd"
                        d="M11.9995 5.07386C13.6879 5.07386 15.2038 5.65409 16.3956 6.79364L19.694 3.49523C17.7024 1.63955 15.0992 0.5 11.9995 0.5C7.50402 0.5 3.61493 3.07705 1.72266 6.83545L5.5647 9.815C6.46902 7.09682 9.00425 5.07386 11.9995 5.07386Z"
                        fill="#EA4335"
                    />
                </svg>
                Continue with Google
            </button>
        </div>
    );
};


export default SignInWithGoogle;