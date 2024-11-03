import { DeleteUserUserCase } from '../use-cases/index.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
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

            const deletedUser = deleteUserUseCase.execute(userId)

            return ok(deletedUser)
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
