import { ok, serverError } from './helpers/https.js'
import {
    invalidIdResponse,
    checkIfIdIsValid,
    userNotFoundResponde,
} from './helpers/user.js'

export class GetUserByIdController {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase
    }
    async execute(httpRequest) {
        try {
            const isIdValid = checkIfIdIsValid(httpRequest.params.userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const user = await this.getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            if (!user) {
                return userNotFoundResponde()
            }
            return ok(user)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
