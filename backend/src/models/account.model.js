import mongoose from 'mongoose'

const { Schema } = mongoose

let Account = null

try {
  const AccountSchema = new Schema({
    account: String,
    dob: Number,
    balance: Number
  })
  Account = mongoose.model('Account', AccountSchema)
} catch (e) {
  Account = mongoose.model('Account')
}

export default Account
