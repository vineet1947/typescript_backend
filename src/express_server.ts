import express, { Application } from 'express'
import { IServerConfig } from './utils/config'
import * as config from '../server_config.json'
import { Server } from 'http'

export class ExpressServer {
  private static server: Server | null = null
  public server_config: IServerConfig = config
  constructor() {
    const port = this.server_config.port ?? 3000
    // initialize express app
    const app = express()
    app.get('/ping', (req, res) => {
      res.send('pong')
    })
    ExpressServer.server = app.listen(port, () => {
      console.log(`Server is running on port ${port} with pid =
 ${process.pid}`)
    })
  }
  //close the express server for safe on uncaughtException
  public closeServer(): void {
    if (ExpressServer.server) {
      ExpressServer.server.close(() => {
        console.log('Server closed')
        process.exit(0)
      })
    }
  }
}
