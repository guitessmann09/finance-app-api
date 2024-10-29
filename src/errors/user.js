export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`The provider email ${email} is already in use.`)
        this.name = 'EmailAlreadyInUseError'
    }
}
