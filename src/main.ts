import cluster from 'cluster'
import os from 'os'
import { ExpressServer } from './express_server'

const numCPU = os.cpus().length

if (cluster.isPrimary) {
  console.log(`Master Process pid: ${process.pid}`)

  // Fork workers for each CPU core
  for (let i = 0; i < numCPU; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `Worker process ${worker.process.pid} exited with code ${code} and signal ${signal}`
    )
    // Fork a new worker immediately after one exits
    cluster.fork()
  })
} else {
  // Worker processes will connect to Express
  const server = new ExpressServer()

  process.on('uncaughtException', (error: Error) => {
    console.error(`Uncaught exception in worker process ${process.pid}:`, error)
    server.closeServer() // Optionally close the server on uncaught exception
  })

  process.on('SIGINT', () => {
    console.log('Received SIGINT signal. Closing server gracefully...')
    server.closeServer()
  })

  process.on('SIGTERM', () => {
    console.log('Received SIGTERM signal. Closing server gracefully...')
    server.closeServer()
  })
}
