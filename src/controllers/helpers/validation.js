import validator from 'validator'
import { badRequest } from './https.js'

export const checkIfIdIsValid = (id) => validator.isUUID(id)
export const invalidIdResponse = () =>
    badRequest({
        message: 'The proveided id is not valid.',
    })
