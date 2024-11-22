export class DeleteTranasctionUseCase {
    constructor(deleteTransactionRepository) {
        this.deleteTransactionRepository = deleteTransactionRepository
    }

    async execute(transactionId) {
        const transaction =
            await this.deleteTransactionRepository.execute(transactionId)

        return transaction
    }
}
