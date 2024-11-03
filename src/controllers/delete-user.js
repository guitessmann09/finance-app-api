import { DeleteUserUserCase } from '../use-cases/index.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    userNotFoundResponde,
    ok,
    serverError,
} from './helpers/index.js'

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId
            const idIsValid = checkIfIdIsValid(userId)

            if (!idIsValid) {
                return invalidIdResponse()
            }

            const deleteUserUseCase = new DeleteUserUserCase()

            const deletedUser = await deleteUserUseCase.execute(userId)

            if (!deletedUser) {
                return userNotFoundResponde()
            }

            return ok(deletedUser)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
