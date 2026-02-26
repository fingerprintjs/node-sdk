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
    }).toThrowError('Sealed data is not valid events response')
  })
})

describe('Unseal event response', () => {
  const sealedData = Buffer.from(
    'noXc7Xu7PIKu1tbMkMxLbQG4XU46Bv5dED98hqTkPYZnmb8PG81Q83Kpg541Vt4NQdkzfezDSVk8FP9ZzJ08L0MMb4S8bT78c10Op1LyKwZU6DGr1e3V+ZWcNzHVG1rPoL+eUHN6yR9MQp8/CmSUBQUPOOAUXdoqWohbfIGxoQIuQ5BtfpSJuYD6kTyswSi56wxzY/s24dMwgS2KnA81Y1pdi3ZVJKBdwGYGg4T5Dvcqu0GWv3sScKD9b4Tagfbe2m8nbXY/QtN770c7J1xo/TNXXdq4lyqaMyqIayHOwRBP58tNF8mACusm1pogOVIt456wIMetCGKxicPJr7m/Q02ONzhkMtzzXwgwriglGHfM7UbtTsCytCBP7J2vp0tEkHiq/X3qtuvSLJqNyRzwFJhgisKGftc5CIaT2VxVKKxkL/6Ws6FPm4sQB1UGtMCMftKpyb1lFzG9lwFkKvYN9+FGtvRM50mbrzz7ONDxbwykkxihAab36MIuk7dfhvnVLFAjrpuCkEFdWrtjVyWmM0xVeXpEUtP6Ijk5P+VuPZ1alV/JV1q4WvfrGMizEZbwbp6eQZg9mwKe4IX+FVi7sPF2S/CCLI/d90S5Yz6bBP9uiQ3pCVlYbVOkpwS0YQxnR+h5J50qodY7LuswNO5VlEgI0ztkjPQBr8koT4SM54X2z14tA2tKCxSv1psEL5HOk4IWN+9f3RVfDKBDruDiDd+BtZquhYLmOFat9K4h41NrPGAqv5tKmmJtx3llMs6LFHPKBlNlI5zgqE7T47xv2AWw5nqWM107t8lpRETIgJx+YN/Jv6byJSQm7afaeDtHXGceMPOKMziH1XgsiQiS56OsmyyRgaq5YCmMuaPw8gcgVa7RNZSafkP34aQBAuJOA3JFs5xcYcubKutD3h1mk697A8vwdtR/Gj0zTvuUnQ/9o3qHSLseAEIiY9/dS6WJnKXRKTonQi2F6DV9NTzFVQl99AH22jq6lIsjbEEKcq/ydFDUpgAq4lyp9nPBHuPXSojdG+1BWuUyjYykaqnLzzqKgRalGzeWmRHd2qeNw8Bz5OWYBw82C3gHRS2BB9VquIgEYktDvgJ5yRfDYkp8qgxHoYeR88ijccWgdvk+WH78OPdwqA7rqdAYcWqn9KNozoxuYddc0fnrHbgaWpanCmPp0gNEeb4r+i9FDGPSkgYBdyrEPHblsDN/Ad1dhLIHEDEtQyv13s6tDRgLVvhowrzqIM+5cm/abyTDhXzSYDfCw2Wf90cBOMsbQBB2N2YRqnrpA50PGp+0IwlPL7qZj1N4JGhvQD0ux8Ood6AiXpdguj7DMP+T0laHIjWee5/xGZB6g3EsCdOZJjVj7hSE/L3eV4No0WcLqJ5DPOgw+FnvQpxndCTc8DW83tNm624lm7scu0A499vEFj1dhtq5gUxsGcqzm09+Vk2V/d0sa77Xocqe3bcfS5lXc/pHrOc1qKlK8kTr2AYNwjeJJ14euuin361WBETd1I6n8eIs02HyBas09o9lT7Nq05jsnbxej6d0q6GH7IYusiBFTJaAZ6UXOV5i1NOcw9jaGyHms3M2N/b2cmXFYTIFZSjSfbqoI6YZF73sMPhEZqfZ5Jjq+ZLMC3A+yFPFJOW/0oolUGbcC8TBVmLi37Z9Wgc338w2Jf+I94SdViku',
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

    expect(result).toBeTruthy()
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
    ).rejects.toThrowError('Invalid sealed data header')
  })

  it('throws error if invalid algorithm is provided', async () => {
    await expect(
      unsealEventsResponse(sealedData, [
        {
          key: invalidKey,
          algorithm: 'invalid-algorithm' as DecryptionAlgorithm,
        },
      ])
    ).rejects.toThrowError('Unsupported decryption algorithm: invalid-algorithm')
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
    ).rejects.toThrowError('Sealed data is not valid events response')
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

    await expect(unsealEventsResponse(sealedData, keys)).rejects.toThrow(
      new UnsealAggregateError(keys.map((k) => new UnsealError(k)))
    )
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
    ).rejects.toThrowError('Invalid sealed data header')
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
