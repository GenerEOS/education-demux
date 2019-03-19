function upsertBal (state, payload, blockInfo, context) {
    try {
        const post = {
            account: payload.data.account,
            dob: payload.data.dob,
            balance: context.stateCopy.balance
        }
        context.socket.emit('upsertbal', post)
    } catch (err) {
        console.error(err);
    }
}

export default upsertBal