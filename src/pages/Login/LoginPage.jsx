import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:3000/practica/v1/auth/login', {
                email,
                password,
            });
    
            const token = response.data.userDetails.token;
            const role = response.data.userDetails.role;
            console.log('Inicio de sesión exitoso:', response.data);
    
            localStorage.setItem('token', token);
    
            // Redirigir según el tipo de usuario
            if (role === 'ADMIN_GENERAL') {
                navigate('/admin');
            } else if (role === 'COMPANY_ROLE') {
                navigate('/company');
            } else {
                navigate('/user');
            }
        } catch (err) {
            // Mostrar un mensaje de error en caso de credenciales incorrectas o fallo del servidor
            if (err.response && err.response.status === 400) {
                setError('Credenciales incorrectas o el usuario no existe.');
            } else {
                setError('Error al iniciar sesión. Inténtalo más tarde.');
            }
        }
    };
    

    return (
        <>
            <section>
                <div className="relative w-full h-[20rem]">
                    <img
                        className="absolute h-full w-full object-cover object-center"
                        src="https://images.unsplash.com/38/awhCbhLqRceCdjcPQUnn_IMG_0249.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjE5fHxvZmljaW5hfGVufDB8fDB8fHww"
                        alt="login background"
                    />
                    <div className="absolute inset-0 h-full w-full bg-black/50"></div>
                    <div className="relative pt-28 text-center">
                        <h2 className="block antialiased tracking-normal font-sans font-semibold leading-[1.3] text-white mb-4 text-3xl lg:text-4xl">
                            ¡INICIA SESIÓN EN TU CUENTA!
                        </h2>
                        <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-white mb-9 opacity-70">
                            Ingresa tus credenciales para acceder a tu cuenta.
                        </p>
                    </div>
                </div>

                <div className="w-full flex justify-center">
                    <div className="my-8 mx-[3rem] w-full max-w-screen-sm">
                        <div className="mx-auto max-w-md rounded-xl border border-gray-200 bg-white shadow-md shadow-black/5 p-8">
                            <form className="space-y-6" onSubmit={handleLogin}>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                        placeholder="correo@ejemplo.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Contraseña
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                        placeholder="********"
                                    />
                                </div>
                                {error && (
                                    <div className="text-red-500 text-sm">
                                        {error}
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember_me"
                                            name="remember_me"
                                            type="checkbox"
                                            className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                            Recuérdame
                                        </label>
                                    </div>
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-black hover:text-gray-700">
                                            ¿Olvidaste tu contraseña?
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                    >
                                        Iniciar Sesión
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default LoginPage;




