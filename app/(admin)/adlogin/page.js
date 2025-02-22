"use client"

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const AdminLoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        const adminUsername = process.env.NEXT_PUBLIC_ADUSERNAME;
        const adminPassword = process.env.NEXT_PUBLIC_ADPASS;

        if (username === adminUsername && password === adminPassword) {
            Cookies.set('admin', process.env.NEXT_PUBLIC_ADUSERNAME+"na", { expires: 1/24 });
            router.push('/admon/createbook'); 
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLoginPage;
