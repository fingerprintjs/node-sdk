import { unsealEventsResponse, DecryptionAlgorithm } from '@fingerprint/fingerprint-server-sdk'
import { config } from 'dotenv'
config()

const sealedData = process.env.BASE64_SEALED_RESULT
const decryptionKey = process.env.BASE64_KEY

if (!sealedData || !decryptionKey) {
  console.error('Please set BASE64_KEY and BASE64_SEALED_RESULT environment variables')
  process.exit(1)
}

try {
  const unsealedData = await unsealEventsResponse(Buffer.from(sealedData, 'base64'), [
    {
      key: Buffer.from(decryptionKey, 'base64'),
      algorithm: DecryptionAlgorithm.Aes256Gcm,
    },
  ])
  console.log(JSON.stringify(unsealedData, null, 2))
} catch (e) {
  console.error(e)
  process.exit(1)
}
