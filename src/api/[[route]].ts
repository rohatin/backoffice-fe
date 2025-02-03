import { handle } from '@hono/node-server/vercel'
import app from './[[...route]]'

export const config = {
  runtime: 'edge',
}

export default handle(app)