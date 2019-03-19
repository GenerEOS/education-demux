async function upsertBal (state, payload, blockInfo, context) {
    try {
        let acc = payload.data.account;

        let accountState = await state.account.findOne({ account: acc }).exec();
        if (accountState) {
            await state.account.updateOne({ account: acc }, {
                $inc: { balance: parseFloat(10) }
            }, { upsert: true }).exec();
        } else {
            await state.account.create({
                account: acc, 
                dob: payload.data.dob,
                balance: parseFloat(10)
            });
        }

        accountState = await state.account.findOne({ account: acc }).exec();
        context.stateCopy = JSON.parse(JSON.stringify(accountState))
    } catch (err) {
        console.error(err);
    }
}

export default upsertBal