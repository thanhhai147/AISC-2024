// Function to set an item in local storage
function setLocalStorage(key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value); // Convert objects to JSON string
    }
    localStorage.setItem(key, value);
}

// Function to get an item from local storage
function getLocalStorage(key) {
    const value = localStorage.getItem(key);
    try {
        return JSON.parse(value); // Parse JSON strings to objects
    } catch (e) {
        return value; // Return raw value if not JSON
    }
}

// Function to delete an item from local storage
function deleteLocalStorage(key) {
    localStorage.removeItem(key);
}

export { setLocalStorage, getLocalStorage, deleteLocalStorage }