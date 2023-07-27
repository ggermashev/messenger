import sha256 from "crypto-js/sha256";

function getRandomNumber() {
    return Math.round(Math.random() * 1_000_000_000)
}

function getHash(value: string) {
    return sha256(value)
}

function isAuth() {
    return !!localStorage.getItem('userId');
}

function logout() {
    localStorage.removeItem('userId')
}

function getAuthUserId() {
    const userId =  localStorage.getItem('userId')
    if (!userId) {
        throw new Error("Нет авторизованного пользователя")
    } else {
        return userId
    }
}

export {
    getRandomNumber,
    getHash,
    isAuth,
    getAuthUserId,
    logout
}
