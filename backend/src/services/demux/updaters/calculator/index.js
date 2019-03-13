import upsertBal from './upsertbal'

export default [
    {
        actionType: `calcaccount::upsertbal`,
        updater: upsertBal
    }
]