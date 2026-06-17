// NewsHub Authentication Module — session-based, no backend required
const AUTH_KEY      = 'newshub_user';
const ACCOUNTS_KEY  = 'newshub_accounts';

const Auth = {
    // ── Session ──────────────────────────────────────────────────────────────
    login(identifier, role) {
        sessionStorage.setItem(AUTH_KEY, JSON.stringify({ identifier, role, loginTime: Date.now() }));
    },

    logout() {
        sessionStorage.removeItem(AUTH_KEY);
        window.location.href = 'signin.html';
    },

    isLoggedIn() {
        return !!sessionStorage.getItem(AUTH_KEY);
    },

    getUser() {
        const d = sessionStorage.getItem(AUTH_KEY);
        return d ? JSON.parse(d) : null;
    },

    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'signin.html';
        }
    },

    // ── Account store (localStorage) ─────────────────────────────────────────
    getAccounts() {
        const data = localStorage.getItem(ACCOUNTS_KEY);
        return data ? JSON.parse(data) : [];
    },

    hasAccounts() {
        return this.getAccounts().length > 0;
    },

    register(userData) {
        const accounts = this.getAccounts();
        accounts.push(userData);
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    },

    // Returns the matching account or null
    findUser(identifier, password) {
        return this.getAccounts().find(acc =>
            acc.email === identifier && acc.password === password
        ) || null;
    }
};
