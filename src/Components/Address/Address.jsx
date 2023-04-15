import { useQueries } from '@tanstack/react-query'
import { useState, useEffect } from "react"
import { alchemy } from '../../Lib';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';

const Address = () => {
    const { address: defaultAddress } = useParams();
    const [address, setAddress] = useState(defaultAddress);
    console.log(typeof defaultAddress)

    const [{
        data: balance,
        error: balanceError
    }, {
        data: transactions,
        error: transactionError
    }] = useQueries({
        queries: [{
            queryKey: ['balance', address],
            queryFn: () => alchemy.core.getBalance(address),
            enabled: !!address,

        }, {
            queryKey: ['transactions', address],
            queryFn: () => alchemy.core.getAssetTransfers({
                category: [
                    'external'
                ],
                toAddress: address,
                withMetadata: true
            }),
            enabled: !!address,
        }]
    })
    const error = balanceError || transactionError;
    const inflowsAndOutflows = transactions?.transfers?.filter(({ metadata: { blockTimestamp } }) => {
        const date = new Date(blockTimestamp);
        return date.getFullYear() === new Date().getFullYear();
    });

    console.log(transactions?.transfers)
    useEffect(() => {
        if (defaultAddress) {
            setAddress(defaultAddress);
        }
    }, [defaultAddress])

    return (
        <div className="Address">
            <h1>Address</h1>
            <input
                type="text"
                placeholder="Enter an address. e.g. 0x00000000000"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />

            {
                error && <p>Error! Please try again.</p>
            }

            {
                balance && (
                    <div>
                        <h2>Balance</h2>
                        <p>{parseInt(balance.toString()) / (10 ** 18)} ETH</p>
                    </div>
                )
            }

            {
                inflowsAndOutflows?.length > 0 && (
                    <div>
                        <h2>Transactions this year ({inflowsAndOutflows.length})</h2>
                        {
                            transactions.slice(0, 20).map(({ metadata: { blockTimestamp }, from, value, hash }) => {
                                const date = new Date(blockTimestamp);

                                return (
                                    <p key={hash}>
                                        Received {value} ETH From <Link to={`/address/${from}`}>{from}</Link> on {date.toLocaleDateString()}
                                    </p>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Address