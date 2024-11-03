export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`The provider email ${email} is already in use.`)
        this.name = 'EmailAlreadyInUseError'
    }
}

export class UserNotFoundError extends Error {
    constructor(userId) {
        super(`User with id ${userId} not found.`)
        this.user = 'UserNotFoundError'
    }
}
