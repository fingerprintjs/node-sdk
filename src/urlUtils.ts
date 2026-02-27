import { Region } from './types'
import { version } from '../package.json'
import { paths } from './generatedApiTypes'

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
    if (value == null) {
      continue
    }

    if (Array.isArray(value)) {
      for (const v of value) {
        if (v == null) {
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

function getServerApiUrl(region: Region): string {
  switch (region) {
    case Region.EU:
      return euRegionUrl
    case Region.AP:
      return apRegionUrl
    case Region.Global:
      return globalRegionUrl
    default:
      throw new Error('Unsupported region')
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
 * Formats a URL for the FingerprintJS server API by replacing placeholders and
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
  // Step 1: Extract the path parameters (placeholders) from the path
  const placeholders = Array.from(path.matchAll(/{(.*?)}/g)).map((match) => match[1])

  // Step 2: Replace the placeholders with provided pathParams
  let formattedPath: string = `${apiVersion}${path}`
  placeholders.forEach((placeholder, index) => {
    if (pathParams?.[index]) {
      formattedPath = formattedPath.replace(`{${placeholder}}`, pathParams[index])
    } else {
      throw new Error(`Missing path parameter for ${placeholder}`)
    }
  })

  const queryStringParameters: QueryStringParameters = {
    ...(queryParams ?? {}),
    ii: getIntegrationInfo(),
  }

  const url = new URL(getServerApiUrl(region ?? Region.Global))
  url.pathname = formattedPath
  url.search = serializeQueryStringParams(queryStringParameters)

  return url.toString()
}
