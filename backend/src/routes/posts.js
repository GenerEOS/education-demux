import { Router } from 'express'
import { listConfirmed } from '../services/post'
import { listAccounts }  from '../services/post'

export default () => {
  let api = Router()

  api.get('/post',    listConfirmed)
  api.get('/account', listAccounts)

  return api
}
