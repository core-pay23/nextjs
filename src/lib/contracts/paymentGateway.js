export const PaymentGatewayAddress =
  "0xE49c73e0E3BA8E504572782510850400b57Ae250";

export const PaymentGatewayAbi = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "_taxAddress",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "_allowedTokens",
                "type": "address[]",
                "internalType": "address[]"
            },
            {
                "name": "_owner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "fallback",
        "stateMutability": "payable"
    },
    {
        "type": "receive",
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "BASIS_POINTS",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "TAX_RATE",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "addAllowedToken",
        "inputs": [
            {
                "name": "_token",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "allowedTokens",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "calculateShopOwnerAmount",
        "inputs": [
            {
                "name": "_totalPayment",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "calculateTax",
        "inputs": [
            {
                "name": "_totalPayment",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "createTransaction",
        "inputs": [
            {
                "name": "_originChain",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "_totalPayment",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_shopOwner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "_paymentToken",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "emergencyWithdraw",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getPayerTransactions",
        "inputs": [
            {
                "name": "_payer",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256[]",
                "internalType": "uint256[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getShopOwnerTransactions",
        "inputs": [
            {
                "name": "_shopOwner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256[]",
                "internalType": "uint256[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTransaction",
        "inputs": [
            {
                "name": "_transactionId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct PaymentGatewayDirect.Transaction",
                "components": [
                    {
                        "name": "id",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "payer",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "originChain",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "totalPayment",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "shopOwner",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "paymentToken",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "timestamp",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "isPaid",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "isRefunded",
                        "type": "bool",
                        "internalType": "bool"
                    },
                    {
                        "name": "taxAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "shopOwnerAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTransactionCounter",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isTokenAllowed",
        "inputs": [
            {
                "name": "_token",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "payTransaction",
        "inputs": [
            {
                "name": "_transactionId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "payTransactionWithToken",
        "inputs": [
            {
                "name": "_transactionId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "payerTransactions",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "refundTransaction",
        "inputs": [
            {
                "name": "_transactionId",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "removeAllowedToken",
        "inputs": [
            {
                "name": "_token",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "shopOwnerTransactions",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "taxAddress",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "transactions",
        "inputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "id",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "payer",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "originChain",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "totalPayment",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "shopOwner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "paymentToken",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "timestamp",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "isPaid",
                "type": "bool",
                "internalType": "bool"
            },
            {
                "name": "isRefunded",
                "type": "bool",
                "internalType": "bool"
            },
            {
                "name": "taxAmount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "shopOwnerAmount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "inputs": [
            {
                "name": "newOwner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "updateTaxAddress",
        "inputs": [
            {
                "name": "_newTaxAddress",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "name": "previousOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TaxAddressUpdated",
        "inputs": [
            {
                "name": "oldTaxAddress",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newTaxAddress",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TokenAllowed",
        "inputs": [
            {
                "name": "token",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TokenRemoved",
        "inputs": [
            {
                "name": "token",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TransactionCreated",
        "inputs": [
            {
                "name": "transactionId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "shopOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "totalPayment",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "originChain",
                "type": "string",
                "indexed": false,
                "internalType": "string"
            },
            {
                "name": "paymentToken",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TransactionPaid",
        "inputs": [
            {
                "name": "transactionId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "payer",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "shopOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "paymentToken",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "paymentAmount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "taxAmount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TransactionRefunded",
        "inputs": [
            {
                "name": "transactionId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "payer",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "refundAmount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "OwnableInvalidOwner",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "OwnableUnauthorizedAccount",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "SafeERC20FailedOperation",
        "inputs": [
            {
                "name": "token",
                "type": "address",
                "internalType": "address"
            }
        ]
    }
]
