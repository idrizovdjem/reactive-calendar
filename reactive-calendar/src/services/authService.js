function isUserAuthenticated() {
    const authToken = localStorage.getItem('authToken');
    return authToken !== null;
}

const userService = {
    isUserAuthenticated
}

export default userService;