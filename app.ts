import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
const app: express.Application = express()

app.use(express.json())
app.use(helmet())

app.use(cookieParser('secret'))

app.get('/', (req: Request, res: Response) => {
  //res.send('hello world')
  throw new Error('Oops ! Something went wrong')
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send('Something went wrong')
})

app.listen(3000, () => {
  console.log('Server listing on port 3000')
})
