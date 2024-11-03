import { PostgresDeleteUserRepository } from '../repositories/postgres/index.js'

export class DeleteUserUserCase {
    async execute(userId) {
        const postgresDeleteUserRepository = new PostgresDeleteUserRepository()

        const deletedUser = await postgresDeleteUserRepository.execute(userId)

        return deletedUser
    }
}
