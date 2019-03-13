import upsertBal from './upsertbal'

export default [
    {
        actionType: `calcaccount::upsertbal`,
        effect: upsertBal
    }
]