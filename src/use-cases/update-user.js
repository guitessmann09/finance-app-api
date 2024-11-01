import bcrypt from 'bcrypt'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import { PostgresUpdateUserRepository } from '../repositories/postgres/update-user.js'

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        // 1. se o email estiver sendo atualizado, verificar se ja esta em uso
        if (updateUserParams.email) {
            const postgresGetUserByEmailReposityory =
                new PostgresGetUserByEmailRepository()
            const userWithProviderEmail =
                await postgresGetUserByEmailReposityory.execute(
                    updateUserParams.email,
                )

            if (userWithProviderEmail && userWithProviderEmail.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email)
            }
        }

        const user = {
            ...updateUserParams,
        }

        // 2. se a senha estiver sendo atualizada, criptografa-la
        if (updateUserParams.password) {
            const hashedpassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            )

            user.password = hashedpassword
        }

        // 3. chamar o repository para atualizar o usuario
        const postgresUpdateUserRepository = new PostgresUpdateUserRepository()
        const updatedUser = await postgresUpdateUserRepository.execute(
            userId,
            user,
        )

        return updatedUser
    }
}
