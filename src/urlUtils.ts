import { ExtractQueryParams, Region } from './types'
import { version } from '../package.json'
import { paths } from './generatedApiTypes'

const apiVersion = 'v4'

const euRegionUrl = 'https://eu.api.fpjs.io/'
const apRegionUrl = 'https://ap.api.fpjs.io/'
const globalRegionUrl = 'https://api.fpjs.io/'

type QueryStringScalar = string | number | boolean | null | undefined

type QueryStringParameters = Record<string, QueryStringScalar | string[]> & {
  api_key?: string
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
        entries.push([`${key}[]`, String(v)])
      }
    } else {
      entries.push([key, String(value)])
    }
  }

  if (!entries.length) {
    return ''
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

/**
 * Extracts parameter placeholders into a literal union type.
 * For example `extractPathParams<'/users/{userId}/posts/{postId}'>` resolves to `"userId" | "postId"
 */
type ExtractPathParams<T extends string> = T extends `${string}{${infer Param}}${infer Rest}`
  ? Param | ExtractPathParams<Rest>
  : never

type PathParams<Path extends keyof paths> =
  ExtractPathParams<Path> extends never
    ? { pathParams?: never }
    : {
        pathParams: ExtractPathParams<Path> extends never ? never : string[]
      }

type QueryParams<Path extends keyof paths, Method extends keyof paths[Path]> =
  ExtractQueryParams<paths[Path][Method]> extends never
    ? { queryParams?: any } // No query params
    : {
        queryParams?: ExtractQueryParams<paths[Path][Method]> // Optional query params
      }

type IsNever<Type> = [Exclude<Type, undefined>] extends [never] ? true : false
type NonNeverKeys<Type> = {
  [Key in keyof Type]-?: IsNever<Type[Key]> extends true ? never : Key
}[keyof Type]
export type AllowedMethod<Path extends keyof paths> = Extract<Exclude<NonNeverKeys<paths[Path]>, 'parameters'>, string>

export type GetRequestPathOptions<Path extends keyof paths, Method extends AllowedMethod<Path>> = {
  path: Path
  method: Method
  region?: Region
} & PathParams<Path> &
  QueryParams<Path, Method>

/**
 * Formats a URL for the FingerprintJS server API by replacing placeholders and
 * appending query string parameters.
 *
 * @internal
 *
 * @param {GetRequestPathOptions<Path, Method>} options
 * @param {Path} options.path - The path of the API endpoint
 * @param {string[]} [options.pathParams] - Path parameters to be replaced in the path
 * @param {QueryParams<Path, Method>["queryParams"]} [options.queryParams] - Query string
 *   parameters to be appended to the URL
 * @param {Region} options.region - The region of the API endpoint
 * @param {Method} options.method - The method of the API endpoint
 *
 * @returns {string} The formatted URL with parameters replaced and query string
 *   parameters appended
 */
export function getRequestPath<Path extends keyof paths, Method extends AllowedMethod<Path>>({
  path,
  pathParams,
  queryParams,
  region,
  // method mention here so that it can be referenced in JSDoc
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  method: _,
}: GetRequestPathOptions<Path, Method>): string {
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
