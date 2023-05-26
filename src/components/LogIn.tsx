import { useState } from 'react';
import { FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';

function LogIn() {

  const [ email, setEmail ] = useState(``);
  const [ password, setPassword ] = useState(``);

  const { logIn } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    logIn({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-16 rounded shadow-2xl w-2/3">
        <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">Login to your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-800 font-light mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-800 font-light mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-500">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
