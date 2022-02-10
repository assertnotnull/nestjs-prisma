import { Maybe } from 'purify-ts'
import { curry, prop } from 'rambdax'

type User = {
  email: string
  accountDetails: {
    address: {
      street: string
      city: string
      province: string
      postcode: string
    }
  }
}

const user = {
  email: 'james@example.com',
  accountDetails: {
    address: {
      street: '123 Fake St',
      city: 'Exampleville',
      province: 'NS',
      postcode: '1234',
    },
  },
  preferences: {},
}

const user2 = {
  email: 'james@example.com',
  accountDetails: {
    address: {
      street: '123 Fake St',
      city: 'Exampleville',
      province: 'AA',
      postcode: '1234',
    },
  },
  preferences: {},
}

const banners: Record<string, string> = {
  AB: '/assets/banners/alberta.jpg',
  BC: '/assets/banners/british-columbia.jpg',
  MB: '/assets/banners/manitoba.jpg',
  NL: '/assets/banners/newfoundland-labrador.jpg',
  NS: '/assets/banners/nova-scotia.jpg',
  NT: '/assets/banners/northwest-territories.jpg',
  ON: '/assets/banners/ontario.jpg',
  PE: '/assets/banners/prince-edward.jpg',
  QC: '/assets/banners/quebec.jpg',
  SK: '/assets/banners/saskatchewan.jpg',
  YT: '/assets/banners/yukon.jpg',
}

const getProvinceBanner = curry(function (
  banners: Record<string, string>,
  province: string,
) {
  return Maybe.fromNullable(banners[province])
})

function getUserBanner(banners: Record<string, string>, user: User) {
  return Maybe.of(user)
    .map(prop('accountDetails'))
    .map(prop('address'))
    .map(prop('province'))
    .chain(getProvinceBanner(banners))
}

console.log(getUserBanner(banners, user2).orDefault('/default'))
console.log(getUserBanner(banners, user).orDefault('/default'))
