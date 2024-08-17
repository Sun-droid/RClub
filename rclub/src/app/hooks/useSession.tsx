'use client'
// app/hooks/userSession.ts
import React, {useEffect, useState} from 'react';

const fetchSession = async () => {
    try {
        const response = await fetch('/api/auth/session');

        if (response.ok) {
//            console.log("22Respo", response)
            return await response.json();
        }
    } catch (error) {
        console.error('Failed to fetch session: ', error)
    }
    return null;
};


export const useSession = () => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const getSession = async () => {
            const sessionData = await fetchSession();
            setSession(sessionData);
        };
        getSession();
    }, []);
//    console.log("fetch session ", session)
    return session;
};




//Shorter version

//export const useSession = () => {
//    const [session, setSession] = useState(null);
//
//    useEffect(() => {
//        const fetchSession = async () => {
//            try {
//                const response = await fetch('/api/auth/session');
//                if (response.ok) {
//                    const sessionData = await response.json();
//                    setSession(sessionData);
//                }
//            } catch (error) {
//                console.error('Failed to fetch session:', error);
//            }
//        };
//
//        fetchSession();
//    }, []);
//
//    return session;
//};