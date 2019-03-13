import { Post } from '../../models'
import { Account } from '../../models'

/**
 * Get list of all posts confirmed by the blockchain
 * @returns {Post[]}
 */
export const listConfirmed = async (req, res) => {
  try {
    const confirmedPosts = await Post.find({ postConfirmed: true }).exec()
    res.send(confirmedPosts)
  } catch (err) {
    console.error(err)
  }
}

export const listAccounts = async (req, res) => {
  try {
    let account = req.query.account;
    let dob = req.query.dob;

    if (account) {
      const confirmedPosts = await Account.find({ account: account }).exec();
      res.send(confirmedPosts);
    } else if (dob) {
      const confirmedPosts = await Account.find({ dob: dob }).exec();
      res.send(confirmedPosts);
    } else {
      const confirmedPosts = await Account.find({ }).exec();
      res.send(confirmedPosts);
    }
  } catch (err) {
    console.error(err);
  }
}