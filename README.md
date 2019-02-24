# Pizza Dapp

This is a sample project to gain more practical experience working with uPort,
Solidity smart contracts and potentially IPFS and blocknative.

The user can login to the dapp using uPort and see a list of their previous orders.
They can also create a new order, which will be peristed on the blockchain.  When the
delivery is completed, the customer must scan a QR code presented by the driver in order
to get their pizza.  The app will keep track of how long it took to get the pizza to the
customer.  If the pizza took more than a configurable amount of time to deliver, the customer
gets their money back.

## Basic workflow

* User logs into app using uPort
* User clicks "Order Now" to order a pizza
* The order is stored on the blockchain
* A QR code is generated for the driver to show to the customer (manually at first)
* When scanned, the QR code triggers a transaction to the orderReceived function.
* The timer stops and calculates the delivery time.  If the delivery time is over 30 minutes, the
total value of the users order is refunded to them.