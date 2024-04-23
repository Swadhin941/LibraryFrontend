import React, { createContext, useEffect, useState } from 'react';

export const SharedData = createContext();

const SharedContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [navButton, setNavButton]= useState(false);
    const [forceLoading, setForceLoading]= useState(false);

    const login = (email, password)=>{
        setLoading(true);
        return fetch(`${process.env.REACT_APP_SERVER}/login`,{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({email, password})
        })
    }
    
    const logout= ()=>{
        setLoading(true);
        localStorage.removeItem("token");
        setUser(null);
        setLoading(false);
    }

    const register = (fullname, email, password, role)=>{
        setLoading(true);
        return fetch(`${process.env.REACT_APP_SERVER}/register`,{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({fullname, email, password, role})
        })
    }

    useEffect(() => {
        setLoading(true);
        const subscriber = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER}/authSubscriberCheck`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({})
                });
                const data = await response.json();
                if (data.user) {
                    // console.log(data.user);
                    setUser(data.user);
                }
                else {
                    setUser(null);
                }
            }
            catch (error) {
                setUser(null);
            }
            setLoading(false);
        }
        return () => subscriber();
    }, [forceLoading])
    
    const authInfo = {
        navButton, setNavButton, user, setUser, loading, setLoading, login, logout, register
    };
    return (
        <div>
            <SharedData.Provider value={authInfo}>
                {children}
            </SharedData.Provider>
        </div>
    );
};

export default SharedContext;