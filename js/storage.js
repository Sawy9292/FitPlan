const Storage = {
    setUser: (user) => {
        localStorage.setItem('fitplan_user', JSON.stringify(user));
    },
    getUser: () => {
        const user = localStorage.getItem('fitplan_user');
        return user ? JSON.parse(user) : null;
    },
    removeUser: () => {
        localStorage.removeItem('fitplan_user');
    },
    getAuthHeaders: () => {
        const token = localStorage.getItem('fitplan_token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    },
    setActivePlan: async (userId, planId) => {
        try {
            const response = await fetch(`${API_BASE}/users/${userId}/active-plans`, {
                method: 'POST',
                headers: Storage.getAuthHeaders(),
                body: JSON.stringify({ planId })
            });
            if (!response.ok) {
                throw new Error('Failed to start plan');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error starting plan:', error);
            throw error;
        }
    },
    getActivePlans: async (userId) => {
        try {
            const response = await fetch(`${API_BASE}/users/${userId}/active-plans`, {
                headers: Storage.getAuthHeaders()
            });
            if (!response.ok) {
                console.warn('Failed to get active plans, status:', response.status);
                return [];
            }
            const data = await response.json();
            console.log('[DEBUG] Active plans response:', data);
            if (data && Array.isArray(data.activePlans)) {
                return data.activePlans;
            } else if (Array.isArray(data)) {
                return data;
            }
            return [];
        } catch (error) {
            console.error('Error getting active plans:', error);
            return [];
        }
    },
    removeActivePlan: async (userId, planId) => {
        try {
            const response = await fetch(`${API_BASE}/users/${userId}/active-plans/${planId}`, {
                method: 'DELETE',
                headers: Storage.getAuthHeaders()
            });
            if (!response.ok) {
                throw new Error('Failed to remove plan');
            }
            return true;
        } catch (error) {
            console.error('Error removing plan:', error);
            throw error;
        }
    },
    saveFavorite: async (userId, planId) => {
        try {
            const response = await fetch(`${API_BASE}/users/${userId}/favorites`, {
                method: 'POST',
                headers: Storage.getAuthHeaders(),
                body: JSON.stringify({ planId })
            });
            if (!response.ok) {
                throw new Error('Failed to save favorite');
            }
            return true;
        } catch (error) {
            console.error('Error saving favorite:', error);
            throw error;
        }
    },
    removeFavorite: async (userId, planId) => {
        try {
            const response = await fetch(`${API_BASE}/users/${userId}/favorites/${planId}`, {
                method: 'DELETE',
                headers: Storage.getAuthHeaders()
            });
            if (!response.ok) {
                throw new Error('Failed to remove favorite');
            }
            return true;
        } catch (error) {
            console.error('Error removing favorite:', error);
            throw error;
        }
    },
    getFavorites: async (userId) => {
        try {
            const response = await fetch(`${API_BASE}/users/${userId}/favorites`, {
                headers: Storage.getAuthHeaders()
            });
            if (!response.ok) {
                throw new Error('Failed to get favorites');
            }
            const data = await response.json();
            const planIds = data.favorites || [];
            const planPromises = planIds.map(planId => 
                fetch(`${API_BASE}/plans/${planId}`)
                    .then(res => res.ok ? res.json() : null)
                    .catch(err => {
                        console.error(`Failed to fetch plan ${planId}:`, err);
                        return null;
                    })
            );
            const plans = await Promise.all(planPromises);
            return plans.filter(plan => plan !== null);
        } catch (error) {
            console.error('Error getting favorites:', error);
            return [];
        }
    },
    isFavorite: async (userId, planId) => {
        try {
            const response = await fetch(`${API_BASE}/users/${userId}/favorites`, {
                headers: Storage.getAuthHeaders()
            });
            if (!response.ok) {
                return false;
            }
            const data = await response.json();
            const planIds = data.favorites || [];
            return planIds.includes(planId);
        } catch (error) {
            console.error('Error checking favorite:', error);
            return false;
        }
    },
    saveDailyLog: async (userId, date, log) => {
        try {
            const response = await fetch(`${API_BASE}/users/${userId}/logs`, {
                method: 'POST',
                headers: Storage.getAuthHeaders(),
                body: JSON.stringify({
                    date,
                    ...log
                })
            });
            if (!response.ok) {
                throw new Error('Failed to save daily log');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error saving daily log:', error);
            throw error;
        }
    },
    updateDailyLog: async (userId, date, log) => {
        try {
            const response = await fetch(`${API_BASE}/users/${userId}/logs/${date}`, {
                method: 'PUT',
                headers: Storage.getAuthHeaders(),
                body: JSON.stringify(log)
            });
            if (!response.ok) {
                throw new Error('Failed to update daily log');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating daily log:', error);
            throw error;
        }
    },
    getDailyLog: async (userId, date) => {
        try {
            const response = await fetch(`${API_BASE}/users/${userId}/logs/${date}`, {
                headers: Storage.getAuthHeaders()
            });
            if (response.status === 404) {
                return null;
            }
            if (!response.ok) {
                throw new Error('Failed to get daily log');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error getting daily log:', error);
            return null;
        }
    },
    getDailyLogs: async (userId) => {
        try {
            const response = await fetch(`${API_BASE}/users/${userId}/logs`, {
                headers: Storage.getAuthHeaders()
            });
            if (!response.ok) {
                throw new Error('Failed to get daily logs');
            }
            const data = await response.json();
            return data.logs || [];
        } catch (error) {
            console.error('Error getting daily logs:', error);
            return [];
        }
    },
    updateUserProfile: async (userId, profileData) => {
        try {
            const response = await fetch(`${API_BASE}/users/${userId}`, {
                method: 'PUT',
                headers: Storage.getAuthHeaders(),
                body: JSON.stringify(profileData)
            });
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            const data = await response.json();
            Storage.setUser(data);
            return data;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    },
    saveProgressData: async (userId, progressData) => {
        try {
            const response = await fetch(`${API_BASE}/users/${userId}/progress`, {
                method: 'PUT',
                headers: Storage.getAuthHeaders(),
                body: JSON.stringify(progressData)
            });
            if (!response.ok) {
                throw new Error('Failed to save progress data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error saving progress data:', error);
            throw error;
        }
    },
    getProgressData: async (userId) => {
        try {
            const response = await fetch(`${API_BASE}/users/${userId}/progress`, {
                headers: Storage.getAuthHeaders()
            });
            if (!response.ok) {
                throw new Error('Failed to get progress data');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error getting progress data:', error);
            return {
                weights: [],
                streak: 0,
                totalWorkoutsDone: 0
            };
        }
    },
    savePhoto: async (userId, type, photoFile) => {
        try {
            const formData = new FormData();
            formData.append('photo', photoFile);
            formData.append('type', type);
            const token = localStorage.getItem('fitplan_token');
            const response = await fetch(`${API_BASE}/users/${userId}/photos`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            if (!response.ok) {
                throw new Error('Failed to upload photo');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error uploading photo:', error);
            throw error;
        }
    },
    getPhotos: async (userId, bustCache = false) => {
        try {
            const cacheBuster = bustCache ? `?t=${Date.now()}` : '';
            const response = await fetch(`${API_BASE}/users/${userId}/photos${cacheBuster}`, {
                headers: Storage.getAuthHeaders()
            });
            if (!response.ok) {
                throw new Error('Failed to get photos');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error getting photos:', error);
            return { photos: { before: [], after: [], profile: [] } };
        }
    },
    deletePhoto: async (userId, photoId) => {
        try {
            const response = await fetch(`${API_BASE}/users/${userId}/photos/${photoId}`, {
                method: 'DELETE',
                headers: Storage.getAuthHeaders()
            });
            if (!response.ok) {
                throw new Error('Failed to delete photo');
            }
            return await response.json();
        } catch (error) {
            console.error('Error deleting photo:', error);
            throw error;
        }
    }
};
