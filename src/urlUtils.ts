import { Region } from './types'
import { version } from '../package.json'
import { paths } from './generatedApiTypes'
import { SdkError } from './errors/errors'
import { toError } from './errors/toError'

const apiVersion = 'v4'

const euRegionUrl = 'https://eu.api.fpjs.io/'
const apRegionUrl = 'https://ap.api.fpjs.io/'
const globalRegionUrl = 'https://api.fpjs.io/'

type QueryStringScalar = string | number | boolean | null | undefined

type QueryStringParameters = Record<string, QueryStringScalar | QueryStringScalar[]> & {
  ii: string
}

export function getIntegrationInfo() {
  return `fingerprint-pro-server-node-sdk/${version}`
}

function serializeQueryStringParams(params: QueryStringParameters): string {
  const entries: [string, string][] = []

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) {
      continue
    }

    if (Array.isArray(value)) {
      for (const v of value) {
        if (v === null || v === undefined) {
          continue
        }
        entries.push([key, String(v)])
      }
    } else {
      entries.push([key, String(value)])
    }
  }

  const urlSearchParams = new URLSearchParams(entries)

  return urlSearchParams.toString()
}

/**
 * `event_id` in the URL template is the `eventId` argument on the client method.
 */
function argumentName(placeholder: string): string {
  return placeholder.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase())
}

/**
 * Confines a value to a single URL path segment. `.` is deliberately left unencoded because
 * the Server API does not decode path parameters, and valid parameter values can contain dots.
 *
 * A value of `.` or `..` is rejected: `new URL()` drops such a segment even when the dots are
 * encoded, so it cannot be expressed. See https://url.spec.whatwg.org/#double-dot-path-segment
 */
function encodePathParam(placeholder: string, value: unknown): string {
  const name = argumentName(placeholder)
  // Coerce before comparing, because an untyped caller can pass something that is not a string
  // but stringifies to one. Both conversions throw on values only such a caller could pass:
  // `String` when the value has no primitive representation, `encodeURIComponent` on a lone
  // surrogate. Wrap either as `SdkError` so it does not escape as its own error type.
  let param: string
  let encoded: string
  try {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string -- runtime validation
    param = String(value ?? '')
    encoded = encodeURIComponent(param)
  } catch (cause) {
    throw new SdkError(`${name} is not valid`, undefined, toError(cause))
  }

  if (param === '') {
    throw new SdkError(`${name} is not set`)
  }

  if (param === '.' || param === '..') {
    throw new SdkError(`${name} is not valid: ${param}`)
  }

  return encoded
}

function getServerApiUrl(region: Region): string {
  switch (region) {
    case Region.EU:
      return euRegionUrl
    case Region.AP:
      return apRegionUrl
    case Region.Global:
      return globalRegionUrl
    default:
      throw new SdkError('Unsupported region')
  }
}

export type HttpMethod = 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace'

export interface GetRequestPathOptions {
  path: keyof paths
  method: HttpMethod
  pathParams?: string[]
  queryParams?: Record<string, QueryStringScalar | QueryStringScalar[]>
  region?: Region
}

/**
 * Formats a URL for the Fingerprint Server API by replacing placeholders and
 * appending query string parameters.
 *
 * @internal
 *
 * @param {GetRequestPathOptions} options
 * @param {keyof paths} options.path - The path of the API endpoint
 * @param {string[]} [options.pathParams] - Path parameters to be replaced in the path
 * @param {GetRequestPathOptions["queryParams"]} [options.queryParams] - Query string
 *   parameters to be appended to the URL
 * @param {Region} options.region - The region of the API endpoint
 * @param {HttpMethod} options.method - The method of the API endpoint
 *
 * @returns {string} The formatted URL with parameters replaced and query string
 *   parameters appended
 */
export function getRequestPath({
  path,
  pathParams,
  queryParams,
  region,
  // method mention here so that it can be referenced in JSDoc
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  method: _,
}: GetRequestPathOptions): string {
  // Replace each `{placeholder}` with its path parameter. The replacement is a function so
  // that `$&` and friends in a parameter are not read as replacement patterns.
  let index = 0
  const formattedPath = `${apiVersion}${path}`.replace(/{(.*?)}/g, (_, placeholder: string) =>
    encodePathParam(placeholder, pathParams?.[index++])
  )

  const queryStringParameters: QueryStringParameters = {
    ...(queryParams ?? {}),
    ii: getIntegrationInfo(),
  }

  const url = new URL(getServerApiUrl(region ?? Region.Global))
  url.pathname = formattedPath
  url.search = serializeQueryStringParams(queryStringParameters)

  if (url.pathname !== `/${formattedPath}`) {
    throw new SdkError('Invalid path: path changed during normalization')
  }

  return url.toString()
}
