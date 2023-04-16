import { useQueries } from '@tanstack/react-query'
import React from 'react'
import { useParams, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { alchemy } from '../../Lib';
import Loader from '../Loader/loader';
import { Card, Container, Row } from 'react-bootstrap';


const Transaction = () => {
    const { hash } = useParams();
    const [{ data: transaction, isLoading, error, },
        { data: receipt, isFetched: isFetchedReceipt }] = useQueries(
            {
                queries: [{
                    queryKey: ['transaction', hash],
                    queryFn: () => alchemy.core.getTransaction(hash),

                },
                {
                    queryKey: ['receipt', hash],
                    queryFn: () => alchemy.core.getTransactionReceipt(hash)
                }]
            }
        )

    const mined = !!receipt;
    console.log(transaction)

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return 'Error retrieving the data, please try again';
    }

    return (
        <>
            <Container className='mt-5'>
                <Card>
                    <Card.Body >
                        <Card.Title >
                            <Row>
                                Transaction hash: {hash}
                            </Row>
                        </Card.Title>
                        <Card.Subtitle>
                            <Row>
                                Timestamp: {transaction.timestamp}
                            </Row>
                        </Card.Subtitle>
                        <Card.Text>
                            <Row>
                                From:<Link to={`/address/${transaction.from}`}>{transaction.from}</Link>
                            </Row>
                        </Card.Text>
                        <Card.Text>
                            <Row>
                                To:<Link to={`/address/${transaction.to}`}>{transaction.to}</Link>
                            </Row>
                        </Card.Text>
                        <Card.Text>
                            <Row>
                                Confirmations: {transaction.confirmations}
                            </Row>
                        </Card.Text>
                        <Card.Text>
                            <Row>
                                Value: {(transaction.value.toString() / 10 ** 18).toFixed(4)} ETH
                            </Row>
                        </Card.Text>
                        <Card.Text>
                            <Row>
                                Block Number: {transaction.blockNumber}
                            </Row>

                        </Card.Text>

                    </Card.Body>

                </Card>
            </Container>
        </>
    )
}

export default Transaction