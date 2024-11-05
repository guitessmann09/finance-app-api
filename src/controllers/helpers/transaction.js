import validator from 'validator'
import { badRequest } from './https.js'

export const checkIfAmountIsValid = (amount) => {
    return validator.isCurrency(amount.toString(), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
    })
}
export const checkIfTypeIsValid = (type) => {
    return ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type)
}

export const invalidAmountResponse = () => {
    return badRequest({
        message: 'The amount mus be a valid currency.',
    })
}

export const invalidTypeResponde = () => {
    return badRequest({
        message: 'The type mus be EARNING, EXPENSE or INVESTMENT',
    })
}
