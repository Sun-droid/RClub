'use client'
// app/hooks/userSession.ts
import React, {useEffect, useState} from 'react';

const fetchSession = async () => {
    const response = await fetch('/api/auth/session');

    if (response.ok) {
        console.log("22Respo", response)
        return await response.json();
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
    console.log("fetch session ", session)
    return session;
};