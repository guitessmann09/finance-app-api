import { EmailAlreadyInUseError } from '../../errors/user.js'
import { badRequest, created, serverError } from '../helpers/index.js'
import { ZodError } from 'zod'
import { createUserSchema } from '../../schemas/user.js'
export class CreateUserController {
    constructor(createUserUserCase) {
        this.createUserUseCase = createUserUserCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await createUserSchema.parseAsync(params)

            const createdUser = await this.createUserUseCase.execute(params)

            return created(createdUser)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.errors[0].message,
                })
            }
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({
                    message: error.message,
                })
            }
            console.log(error)
            return serverError()
        }
    }
}
