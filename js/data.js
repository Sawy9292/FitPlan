const Data = {
    _plansCache: null,
    _foodsCache: null,
    getPlans: async () => {
        if (Data._plansCache) {
            return Data._plansCache;
        }
        try {
            const response = await fetch(`${API_BASE}/plans`);
            if (!response.ok) {
                throw new Error('Failed to fetch plans');
            }
            const data = await response.json();
            Data._plansCache = data;
            return data;
        } catch (error) {
            console.error('Error fetching plans:', error);
            return [];
        }
    },
    getPlanById: async (id) => {
        try {
            const response = await fetch(`${API_BASE}/plans/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch plan');
            }
            const data = await response.json();
            if (Data._plansCache) {
                const index = Data._plansCache.findIndex(p => p.id === id);
                if (index >= 0) {
                    Data._plansCache[index] = data;
                } else {
                    Data._plansCache.push(data);
                }
            } else {
                Data._plansCache = [data];
            }
            return data;
        } catch (error) {
            console.error('Error fetching plan:', error);
            if (Data._plansCache) {
                return Data._plansCache.find(p => p.id === id);
            }
            return null;
        }
    },
    searchPlans: async (filters = {}) => {
        try {
            const params = new URLSearchParams();
            if (filters.type) params.append('type', filters.type);
            if (filters.goal) params.append('goal', filters.goal);
            if (filters.difficulty) params.append('difficulty', filters.difficulty);
            if (filters.duration) params.append('duration', filters.duration);
            if (filters.equipment) params.append('equipment', filters.equipment);
            const queryString = params.toString();
            const url = queryString ? `${API_BASE}/plans?${queryString}` : `${API_BASE}/plans`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to search plans');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error searching plans:', error);
            return [];
        }
    },
    getFoodDatabase: async () => {
        if (Data._foodsCache) {
            return Data._foodsCache;
        }
        try {
            const response = await fetch(`${API_BASE}/foods`);
            if (!response.ok) {
                throw new Error('Failed to fetch foods');
            }
            const data = await response.json();
            Data._foodsCache = data;
            return data;
        } catch (error) {
            console.error('Error fetching foods:', error);
            return [];
        }
    },
    searchFood: async (query) => {
        try {
            const response = await fetch(`${API_BASE}/foods/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Failed to search foods');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error searching foods:', error);
            return [];
        }
    },
    clearCache: () => {
        Data._plansCache = null;
        Data._foodsCache = null;
    },
    refreshCache: async () => {
        Data.clearCache();
        await Promise.all([
            Data.getPlans(),
            Data.getFoodDatabase()
        ]);
    }
};
