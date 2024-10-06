import express, { Application, Request, Response } from 'express'
import { IServerConfig } from './utils/config'
import * as config from '../server_config.json'

class ExpressServer {
  public app: Application
  public server: any // Use the appropriate type for your server instance
  public server_config: IServerConfig = config

  constructor() {
    // Initialize express app
    this.app = express()
    const port = this.server_config.port ?? 3000

    // Define a sample route
    this.app.get('/ping', (req: Request, res: Response) => {
      res.send('pong')
    })

    // Start the server
    this.server = this.app.listen(port, () => {
      console.log(`Server is running on port ${port} with pid = ${process.pid}`)
    })

    // Handle process termination signals
    process.on('SIGINT', () => {
      console.log('Received SIGINT signal. Closing server gracefully...')
      this.closeServer()
    })

    process.on('SIGTERM', () => {
      console.log('Received SIGTERM signal. Closing server gracefully...')
      this.closeServer()
    })
  }

  // Method to close the server gracefully
  public closeServer(): void {
    if (this.server) {
      this.server.close(() => {
        console.log('Server closed')
        process.exit(0)
      })
    }
  }
}

// Create and start the server
new ExpressServer()
