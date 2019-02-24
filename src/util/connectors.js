import { Connect } from 'uport-connect'
import W3 from 'web3'

export const uport = new Connect('TruffleBox')
export const web3 = new W3(new W3.providers.HttpProvider('https://rinkeby.infura.io/v3/'))