import { jwtDecode } from 'jwt-decode';

class AuthService {
    loggedIn() {
        const token = this.getToken();
        return token && !this.isTokenExpired(token) ? true : false;
    }

    isTokenExpired(token) {
        const decoded = jwtDecode(token);
        if(decoded.exp < Date.now() / 1000) {
            localStorage.removeItem('token');
            return true;
        }
        return false;
    }

    getToken() {
        return localStorage.getItem('token');
    }

    login(token) {
        localStorage.setItem('token', token);
        window.location.assign('/notes');
    }

    logout() {
        localStorage.removeItem('token');
        window.location.reload();
    }
}

export default new AuthService();