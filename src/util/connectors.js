import { Connect } from 'uport-connect'
import W3 from 'web3'

export const uport = new Connect('Casa Nostra Pizza', {
    network: "rinkeby",
    profileImage: { "/": "/ipfs/QmQ7iVLcvaSvpZTR6G2eeXJizQGVZgePHJfGrQWQrcJUT4" },
    bannerImage: { "/": "/ipfs/QmSntV7qd59CKHG8ovobJiaynokvRFVujKyh4MXdweZdZj" },
    description: "Pizza Ordering Example Application",
})

export const web3 = new W3(new W3.providers.HttpProvider('https://rinkeby.infura.io/v3/'))