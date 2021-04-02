function isUserAuthenticated() {
    const authToken = sessionStorage.getItem('authToken');
    return authToken !== null;
}

const userService = {
    isUserAuthenticated
}

export default userService;