import { ref, watch } from 'vue';

export default function useLocalStorage(key) {
    // Function to store data in localStorage
    function setLocalStorage(value) {
        if (typeof value === 'boolean') {
            localStorage.setItem(key, value.toString());
        } else if (typeof value === 'object') {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, value);
        }
    }

    // Function to retrieve data from localStorage
    function getLocalStorage() {
        const storedValue = localStorage.getItem(key);
        if (storedValue === null) {
            return null;
        }

        // Check if the stored value is boolean
        if (storedValue === 'true' || storedValue === 'false') {
            return storedValue === 'true';
        }

        // Check if the stored value is JSON
        try {
            return JSON.parse(storedValue);
        } catch (error) {
            return storedValue;
        }
    }

    // Reactive variable to track the stored value
    const value = ref(getLocalStorage());

    // Watch for changes and update the localStorage accordingly
    watch(value, (newValue) => {
        setLocalStorage(newValue);
    });

    return value;
}