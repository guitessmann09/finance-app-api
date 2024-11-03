import { PostgresGetUserByIdRepository } from '../repositories/postgres/index.js'

export class GetUserByIdUseCase {
    async execute(userId) {
        const getUserByIdUseCase = new PostgresGetUserByIdRepository()

        const user = await getUserByIdUseCase.execute(userId)

        return user
    }
}
