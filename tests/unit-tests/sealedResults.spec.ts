import { describe, expect, it } from 'vitest'
import {
  DecryptionAlgorithm,
  parseEventsResponse,
  UnsealAggregateError,
  UnsealError,
  unsealEventsResponse,
} from '../../src'

describe('Parse events response', () => {
  it('throws if response is not valid events response', () => {
    expect(() => {
      parseEventsResponse('{}')
    }).toThrow('Sealed data is not valid events response')
  })
})

describe('Unseal event response', () => {
  const sealedData = Buffer.from(
    'noXc7bEdLlzJx56624i+YKrrNnCeA4bEF4ew1kUA8Yae7+E/SMA6aCyfJBe359ckVaD30umernyW4CyUvJ88OGDaB5AAN5J6VX2u74vl3jHXl5wJRPsBOiGXjh2rrZWF9BTyP/HxxAdxd6Ez8dsdF/5onjr5mszip7IeERdHJ7eIdLWfKUxC5SOOs3D0GhyFdLBJtMKrmk8B9EEi//7UIj5IETBCnL7NPhmuVWVaxWDSVGxDoCmXXHxGwPB1LeWdYlczxiTyIf6LIl6d4p9Q1oayk5x9j1b04m6LDqmjdQj+8ZwMPJpFWJpWJb1Z6SB/y4hql4kq6pQ0DKwsP6S47XPZb3U6cpIzMSGRh/E9JSTJQhW7jgjQdBnm7I4IxvN5nsCAX2EGYgR37MCAQeuSJs9vj5ZM8aZamzCN4RcDqBVjFZqdF9yAD53ZiVre+sadnCjWRbvkVBTKfzKJ7KjYmQftGn1l+W4ynHNg05+ksLAzsgwThQEH4/uLiIyKM4Qq2nFgaHtW9SBF07KniaeKRioc2lu+MFDCByGzpRVoLgrNAMmHBXES4IihVUuh0KHmtFuHE13x/4x2BZVyRMCKtfPAJ0kR9TDA7JZcR4JP1PP20KgqDyMMiDrDaHhyRqcOEmuwRVRCoARIqo0WmBBzRt7g8vQrCisPoJnbC/9NYlTjZWSu/0GEsKgpxKqAjXMppewREOiMKswZwQdj/Sn+Hs/seo0lhmetpb8nDvP6Ys67HAhVj/Uadi2rp6YpMI43e1ujV3FZCVNSGTKdzgHkq9d2kgo3bKwtSCTMwd+k/8vkdeNZnnyvewyt7ZGmzKZNCDGRE2xjLqKviiw4UALVbKA8/ZiQTWX21387Mc3jq18KD1fZjvTEF2pMVoCxXttyC1Wt8rd4esL3bPcpp1R0HbFyWp+nKJDKFUrfQ5040ru94h5t5/DpozGgEE4A4kVhH6sdX3JqRUWe2kEPo/2CPkTXFcRS3qTs70SDW0wvk5B5LgR54BlkAd++CBlgg8fpxNsw9L8BdQqIaqQv4PaEKOcURpRn9ULDtfsW89dCXgcJnesirG22Mn+Ly6MH1f8paX59ZS2n1cPvvMkposgj2cIrfQJUoBlqoSI4Dp0qB7IDk7oD/ggZujTRYhwDrvInQDGSTybanwsfw2F78rSLeE/aKaKfUj2olHg9uD6bfkY+EZR9who+Qlr+PEp2I4qGf2NZFAD5TduQGveo864cYbWBZWoHg5GJ43fLmOwVfW5ZxByGCBseeYid80H05YWI+Etz5YxJfkYHI4oqJ3U4zrEtyWgryvCK6CvStHW820H0C77IE2ZAlh0mHXPUSV0UzoE+GaPLYIMk5TnhlYAd5H9Lg5Ggj01sxNdKRfmx/9hAUp3aOmeZ7N3PZYa07SoRvAkf5IAwVZqbT5i155jMXQ0oicyUvDC7+dHKjckbTCP8WhUadQPd5xRCCPJ7LWOXzNV6N/3zhIRNZ0Y5szQXWp/bTV1BY0lvpYpm1FIC0T2+mhBZeqhZSXPR3yD65lg71fysQlFJvsE9gNAYO82motGxhuUzb/pb9Zdrk/Kwb6N4DnqgryXsb4pj7D9HoIEz6HPkPK0FMx5MNgpAZiz63eU4U8MrxfgCy8iry6NTz2KXdbE8RwM5Ehrw',
    'base64'
  )
  const validKey = Buffer.from('p2PA7MGy5tx56cnyJaFZMr96BCFwZeHjZV2EqMvTq53=', 'base64')
  const invalidKey = Buffer.from('a2PA7MGy5tx56cnyJaFZMr96BCFwZeHjZV2EqMvTq53=', 'base64')

  it('unseals sealed data using aes256gcm', async () => {
    const result = await unsealEventsResponse(sealedData, [
      {
        key: invalidKey,
        algorithm: DecryptionAlgorithm.Aes256Gcm,
      },
      {
        key: validKey,
        algorithm: DecryptionAlgorithm.Aes256Gcm,
      },
    ])

    expect(result.source).toBe('device')
    expect(result).toMatchSnapshot()
  })

  it('unseals sealed data using aes256gcm, passed as a string parameter', async () => {
    const result = await unsealEventsResponse(sealedData, [
      {
        key: invalidKey,
        algorithm: 'aes-256-gcm',
      },
      {
        key: validKey,
        algorithm: 'aes-256-gcm',
      },
    ])

    // This test just checks that the types provide the expected behavior
    // so a simple assertion to use the result variable is all that is required
    expect(result).toBeTruthy()
  })

  it('throws error if header is not correct', async () => {
    const invalidData = Buffer.from(
      'xzXc7SXO+mqeAGrvBMgObi/S0fXTpP3zupk8qFqsO/1zdtWCD169iLA3VkkZh9ICHpZ0oWRzqG0M9/TnCeKFohgBLqDp6O0zEfXOv6i5q++aucItznQdLwrKLP+O0blfb4dWVI8/aSbd4ELAZuJJxj9bCoVZ1vk+ShbUXCRZTD30OIEAr3eiG9aw00y1UZIqMgX6CkFlU9L9OnKLsNsyomPIaRHTmgVTI5kNhrnVNyNsnzt9rY7fUD52DQxJILVPrUJ1Q+qW7VyNslzGYBPG0DyYlKbRAomKJDQIkdj/Uwa6bhSTq4XYNVvbk5AJ/dGwvsVdOnkMT2Ipd67KwbKfw5bqQj/cw6bj8Cp2FD4Dy4Ud4daBpPRsCyxBM2jOjVz1B/lAyrOp8BweXOXYugwdPyEn38MBZ5oL4D38jIwR/QiVnMHpERh93jtgwh9Abza6i4/zZaDAbPhtZLXSM5ztdctv8bAb63CppLU541Kf4OaLO3QLvfLRXK2n8bwEwzVAqQ22dyzt6/vPiRbZ5akh8JB6QFXG0QJF9DejsIspKF3JvOKjG2edmC9o+GfL3hwDBiihYXCGY9lElZICAdt+7rZm5UxMx7STrVKy81xcvfaIp1BwGh/HyMsJnkE8IczzRFpLlHGYuNDxdLoBjiifrmHvOCUDcV8UvhSV+UAZtAVejdNGo5G/bz0NF21HUO4pVRPu6RqZIs/aX4hlm6iO/0Ru00ct8pfadUIgRcephTuFC2fHyZxNBC6NApRtLSNLfzYTTo/uSjgcu6rLWiNo5G7yfrM45RXjalFEFzk75Z/fu9lCJJa5uLFgDNKlU+IaFjArfXJCll3apbZp4/LNKiU35ZlB7ZmjDTrji1wLep8iRVVEGht/DW00MTok7Zn7Fv+MlxgWmbZB3BuezwTmXb/fNw==',
      'base64'
    )

    await expect(
      unsealEventsResponse(invalidData, [
        {
          key: invalidKey,
          algorithm: DecryptionAlgorithm.Aes256Gcm,
        },
        {
          key: validKey,
          algorithm: DecryptionAlgorithm.Aes256Gcm,
        },
      ])
    ).rejects.toThrow('Invalid sealed data header')
  })

  it('throws error if invalid algorithm is provided', async () => {
    await expect(
      unsealEventsResponse(sealedData, [
        {
          key: invalidKey,
          algorithm: 'invalid-algorithm' as DecryptionAlgorithm,
        },
      ])
    ).rejects.toThrow('Unsupported decryption algorithm: invalid-algorithm')
  })

  it('throws error if sealed result is not valid event response', async () => {
    await expect(
      unsealEventsResponse(
        Buffer.from(
          // "{\"invalid\":true}"
          'noXc7VOpBstjjcavDKSKr4HTavt4mdq8h6NC32T0hUtw9S0jXT8lPjZiWL8SyHxmrF3uTGqO+g==',
          'base64'
        ),
        [
          {
            key: validKey,
            algorithm: DecryptionAlgorithm.Aes256Gcm,
          },
        ]
      )
    ).rejects.toThrow('Sealed data is not valid events response')
  })

  it('throws error if sealed result was not compressed', async () => {
    try {
      await unsealEventsResponse(
        Buffer.from(
          'noXc7dtuk0smGE+ZbaoXzrp6Rq8ySxLepejTsu7+jUXlPhV1w+WuHx9gbPhaENJnOQo8BcGmsaRhL5k2NVj+DRNzYO9cQD7wHxmXKCyTbl/dvSYOMoHziUZ2VbQ7tmaorFny26v8jROr/UBGfvPE0dLKC36IN9ZlJ3X0NZJO8SY+8bCr4mTrkVZsv/hpvZp+OjC4h7e5vxcpmnBWXzxfaO79Lq3aMRIEf9XfK7/bVIptHaEqtPKCTwl9rz1KUpUUNQSHTPM0NlqJe9bjYf5mr1uYvWHhcJoXSyRyVMxIv/quRiw3SKJzAMOTBiAvFICpWuRFa+T/xIMHK0g96w/IMQo0jdY1E067ZEvBUOBmsJnGJg1LllS3rbJVe+E2ClFNL8SzFphyvtlcfvYB+SVSD4bzI0w/YCldv5Sq42BFt5bn4n4aE5A6658DYsfSRYWqP6OpqPJx96cY34W7H1t/ZG0ulez6zF5NvWhc1HDQ1gMtXd+K/ogt1n+FyFtn8xzvtSGkmrc2jJgYNI5Pd0Z0ent73z0MKbJx9v2ta/emPEzPr3cndN5amdr6TmRkDU4bq0vyhAh87DJrAnJQLdrvYLddnrr8xTdeXxj1i1Yug6SGncPh9sbTYkdOfuamPAYOuiJVBAMcfYsYEiQndZe8mOQ4bpCr+hxAAqixhZ16pQ8CeUwa247+D2scRymLB8qJXlaERuFZtWGVAZ8VP/GS/9EXjrzpjGX9vlrIPeJP8fh2S5QPzw55cGNJ7JfAdOyManXnoEw2/QzDhSZQARVl+akFgSO0Y13YmbiL7H6HcKWGcJ2ipDKIaj2fJ7GE0Vzyt+CBEezSQR99Igd8x3p2JtvsVKp35iLPksjS1VqtSCTbuIRUlINlfQHNjeQiE/B/61jo3Mf7SmjYjqtvXt5e9RKb+CQku2qH4ZU8xN3DSg+4mLom3BgKBkm/MoyGBpMK41c96d2tRp3tp4hV0F6ac02Crg7P2lw8IUct+i2VJ8VUjcbRfTIPQs0HjNjM6/gLfLCkWOHYrlFjwusXWQCJz91Kq+hVxj7M9LtplPO4AUq6RUMNhlPGUmyOI2tcUMrjq9vMLXGlfdkH185zM4Mk+O7DRLC8683lXZFZvcBEmxr855PqLLH/9SpYKHBoGRatDRdQe3oRp6gHS0jpQ1SW/si4kvLKiUNjiBExvbQVOUV7/VFXvG1RpM9wbzSoOd40gg7ZzD/72QshUC/25DkM/Pm7RBzwtjgmnRKjT+mROeC/7VQLoz3amv09O8Mvbt+h/lX5+51Q834F7NgIGagbB20WtWcMtrmKrvCEZlaoiZrmYVSbi1RfknRK7CTPJkopw9IjO7Ut2EhKZ+jL4rwk6TlVm6EC6Kuj7KNqp6wB/UNe9eM2Eym/aiHAcja8XN4YQhSIuJD2Wxb0n3LkKnAjK1/GY65c8K6rZsVYQ0MQL1j4lMl0UZPjG/vzKyetIsVDyXc4J9ZhOEMYnt/LaxEeSt4EMJGBA9wpTmz33X4h3ij0Y3DY/rH7lrEScUknw20swTZRm5T6q1bnimj7M1OiOkebdI09MZ0nyaTWRHdB7B52C/moh89Q7qa2Fulp5h8Us1FYRkWBLt37a5rGI1IfVeP38KaPbagND+XzWpNqX4HVrAVPLQVK5EwUvGamED3ooJ0FMieTc0IH0N+IeUYG7Q8XmrRVBcw32W8pEfYLO9L71An/J0jQZCIP8DuQnUG0mOvunOuloBGvP/9LvkBlkamh68F0a5f5ny1jloyIFJhRh5dt2SBlbsXS9AKqUwARYSSsA9Ao4WJWOZMyjp8A+qIBAfW65MdhhUDKYMBgIAbMCc3uiptzElQQopE5TT5xIhwfYxa503jVzQbz1Q==',
          'base64'
        ),

        [
          {
            key: validKey,
            algorithm: DecryptionAlgorithm.Aes256Gcm,
          },
        ]
      )
    } catch (e) {
      expect(e).toBeInstanceOf(UnsealAggregateError)

      expect((e as Error).toString()).toMatchInlineSnapshot(
        `"UnsealError: Unable to decrypt sealed data: invalid distance too far back"`
      )

      return
    }

    throw new Error('Expected error to be thrown')
  })

  it('throws error if all decryption keys are invalid', async () => {
    const keys = [
      {
        key: invalidKey,
        algorithm: DecryptionAlgorithm.Aes256Gcm,
      },
      {
        key: Buffer.from('aW52YWxpZA==', 'base64'),
        algorithm: DecryptionAlgorithm.Aes256Gcm,
      },
    ]

    const error = await unsealEventsResponse(sealedData, keys).catch((e: unknown) => e)

    expect(error).toBeInstanceOf(UnsealAggregateError)
    const { errors } = error as UnsealAggregateError
    expect(errors).toHaveLength(keys.length)
    expect(errors.every((e) => e instanceof UnsealError)).toBe(true)
    expect(errors.map((e) => e.key)).toEqual(keys)
  })

  it('throws if data is empty', async () => {
    const invalidData = Buffer.from('', 'utf-8')

    await expect(
      unsealEventsResponse(invalidData, [
        {
          key: invalidKey,
          algorithm: DecryptionAlgorithm.Aes256Gcm,
        },
        {
          key: validKey,
          algorithm: DecryptionAlgorithm.Aes256Gcm,
        },
      ])
    ).rejects.toThrow('Invalid sealed data header')
  })

  it('throws if nonce is not correct', async () => {
    const invalidData = Buffer.from([0x9e, 0x85, 0xdc, 0xed, 0xaa, 0xbb, 0xcc])

    try {
      await unsealEventsResponse(
        invalidData,

        [
          {
            key: validKey,
            algorithm: DecryptionAlgorithm.Aes256Gcm,
          },
        ]
      )
    } catch (e) {
      expect(e).toBeInstanceOf(UnsealAggregateError)

      expect((e as Error).toString()).toMatchInlineSnapshot(
        `"UnsealError: Unable to decrypt sealed data: Invalid authentication tag length: 7"`
      )

      return
    }

    throw new Error('Expected error to be thrown')
  })
})
