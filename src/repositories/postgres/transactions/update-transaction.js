import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresUpdateTransactionRepository {
    async execute(transactionId, updateTransactionParamns) {
        const updateFields = []
        const updateValues = []

        Object.keys(updateTransactionParamns).forEach((key) => {
            updateFields.push(`${key} = $${updateValues.length + 1}`)
            updateValues.push(updateTransactionParamns[key])
        })

        updateValues.push(transactionId)

        const updateQuery = `
            UPDATE users
            SET ${updateFields.join(', ')}
            WHERE id = $${updateValues.length}
            RETURNING *
        `

        const updateUser = await PostgresHelper.query(updateQuery, updateValues)
        return updateUser[0]
    }
}
