const Auth = {
    isLoggedIn: () => {
        return !!localStorage.getItem('fitplan_token');
    },
    register: async (userData) => {
        try {
            const response = await fetch(`${API_BASE}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userData.email,
                    password: userData.password,
                    firstName: userData.firstName,
                    lastName: userData.lastName || '',
                    height: parseFloat(userData.height) || 0,
                    currentWeight: parseFloat(userData.currentWeight) || 0,
                    targetWeight: parseFloat(userData.targetWeight) || 0,
                    activityLevel: userData.activityLevel || 'moderate',
                    dailyCaloricGoal: parseInt(userData.dailyCaloricGoal) || 2000,
                })
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Registration failed');
            }
            const data = await response.json();
            localStorage.setItem('fitplan_token', data.token);
            Storage.setUser(data.user);
            return data.user;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },
    login: async (email, password, rememberMe = false) => {
        try {
            const response = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Login failed');
            }
            const data = await response.json();
            localStorage.setItem('fitplan_token', data.token);
            Storage.setUser(data.user);
            if (rememberMe) {
                const expiryDate = new Date();
                expiryDate.setDate(expiryDate.getDate() + 30); // 30 days from now
                localStorage.setItem('fitplan_remember_expiry', expiryDate.toISOString());
                console.log('[AUTH] Remember me enabled until:', expiryDate.toLocaleDateString());
            } else {
                localStorage.removeItem('fitplan_remember_expiry');
            }
            return data.user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },
    logout: async () => {
        try {
            const token = localStorage.getItem('fitplan_token');
            if (token) {
                await fetch(`${API_BASE}/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('fitplan_token');
            Storage.removeUser();
        }
    },
    getCurrentUser: async () => {
        const cachedUser = Storage.getUser();
        if (cachedUser) {
            return cachedUser;
        }
        const token = localStorage.getItem('fitplan_token');
        if (!token) {
            return null;
        }
        try {
            const response = await fetch(`${API_BASE}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }
            const user = await response.json();
            Storage.setUser(user);
            return user;
        } catch (error) {
            console.error('Get current user error:', error);
            localStorage.removeItem('fitplan_token');
            return null;
        }
    },
    getAuthHeaders: () => {
        const token = localStorage.getItem('fitplan_token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }
};
