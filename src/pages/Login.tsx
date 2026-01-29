import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LogIn, User, Lock, Loader2 } from 'lucide-react';
import '../styles/Login.css';

const Login: React.FC = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('harry@company.com');
    const [password, setPassword] = useState('password123');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await login(email, password);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="logo-badge">
                        <LogIn size={28} />
                    </div>
                    <h1>Welcome Back</h1>
                    <p>Sign in to HRMS Portal</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="login-error">{error}</div>}

                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <User size={18} className="input-icon" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock size={18} className="input-icon" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="login-button">
                        {isSubmitting ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            'Sign In'
                        )}
                    </button>

                    <div className="demo-hint">
                        <p>Demo Auth: <code>harry@company.com</code> / <code>password123</code></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
