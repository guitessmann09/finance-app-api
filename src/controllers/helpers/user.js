import validator from 'validator'
import { badRequest, notFound } from './https.js'

export const invalidPasswordResponse = () =>
    badRequest({
        message: 'Password must be at least 6 characters',
    })

export const emailIsAlreadyInUseResponse = () =>
    badRequest({
        message: 'Invalid email. Please provide a valid one.',
    })

export const checkIfPasswordIsValid = (password) => password.length >= 6

export const checkIfEmailIsValid = (email) => validator.isEmail(email)

export const userNotFoundResponse = () =>
    notFound({
        message: 'User not found.',
    })
