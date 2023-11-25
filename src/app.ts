import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { userRoute } from './app/modules/user/user.route'
const app: Application = express()

//parser
app.use(express.json())
app.use(cors())
app.use('/api/users', userRoute)
app.get('/', async (req: Request, res: Response) => {
  res.send('Welcome to my user server')
})

export default app
