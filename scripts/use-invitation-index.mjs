import { copyFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const source = resolve('wedding-invitation.html')
const destination = resolve('dist/index.html')

await mkdir(dirname(destination), { recursive: true })
await copyFile(source, destination)

console.log('Copied wedding-invitation.html to dist/index.html for production deploy.')
