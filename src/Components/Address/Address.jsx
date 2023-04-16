import { useQueries } from '@tanstack/react-query'
import { useState, useEffect } from "react"
import { alchemy } from '../../Lib';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Card, Container, Row } from 'react-bootstrap';


const Address = () => {
    const { address: defaultAddress } = useParams();
    const [address, setAddress] = useState(defaultAddress);

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

    useEffect(() => {
        if (defaultAddress) {
            setAddress(defaultAddress);
        }
    }, [defaultAddress])

    return (
        <>
            <Container className="mb-5 mt-5 mr-5 ml-5">
                {/* <input
                    type="text"
                    placeholder="Enter an address. e.g. 0x00000000000"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                /> */}
                <Card>
                    <Card.Body className='addressCard'>
                        <Card.Title >
                            <Row>
                                Address
                            </Row>
                        </Card.Title>
                        <Card.Subtitle>
                            <Row>{address}</Row>
                        </Card.Subtitle>
                        <Card.Text>
                            {
                                balance && (
                                    <Row>
                                        Balance: {parseInt(balance.toString()) / (10 ** 18)} ETH
                                    </Row>
                                )
                            }
                        </Card.Text>
                        {
                            transactions?.transfers && (
                                <>
                                    <Card.Text>Transactions this year ({transactions?.transfers?.length})</Card.Text>
                                    <Card.Text>

                                        {
                                            transactions?.transfers?.slice(0, 20).map(({ metadata: { blockTimestamp }, from, value, hash }) => {
                                                const date = new Date(blockTimestamp);

                                                return (
                                                    <Row key={hash}>
                                                        Received {value} ETH From <Link to={`/address/${from}`}>{from}</Link> on {date.toLocaleDateString()}
                                                    </Row>
                                                )
                                            })
                                        }
                                    </Card.Text>
                                </>
                            )
                        }
                    </Card.Body>

                </Card>
            </Container>
        </>
    )
}

export default Address