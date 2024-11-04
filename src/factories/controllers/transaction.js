import { CreateTransactionController } from '../../controllers/index.js'
import { PostgresGetUserByEmailRepository } from '../../repositories/postgres/index.js'
import { PostgresCreateTransactionRepository } from '../../repositories/postgres/index.js'
import { CreateTransactionUseCase } from '../../use-cases/index.js'

export const makeCreateTransactionConstoller = () => {
    const createTransactionRepository =
        new PostgresCreateTransactionRepository()
    const getUserByIdRepository = new PostgresGetUserByEmailRepository()

    const createTransactionUseCase = new CreateTransactionUseCase(
        createTransactionRepository,
        getUserByIdRepository,
    )

    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    )

    return createTransactionController
}
