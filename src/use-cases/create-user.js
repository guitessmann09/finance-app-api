import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/index.js'
import { EmailAlreadyInUseError } from '../errors/user.js'

export class CreateUserUseCase {
    constructor(createUserRepository) {
        this.createUserRepository = createUserRepository
    }
    async execute(createUserParams) {
        //verifcar se o mail ja esta em uso
        const postgresGetUserByEmailReposityory =
            new PostgresGetUserByEmailRepository()
        const userWithProviderEmail =
            await postgresGetUserByEmailReposityory.execute(
                createUserParams.email,
            )

        if (userWithProviderEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
        }
        //gerar ID do usuario
        const userId = uuidv4()

        //criptografar a senha
        const hashedpassword = await bcrypt.hash(createUserParams.password, 10)

        //inserir o usuario no banco de dados
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedpassword,
        }

        //chamar o repositorio
        const createdUser = await this.createUserRepository.execute(user)

        return createdUser
    }
}
