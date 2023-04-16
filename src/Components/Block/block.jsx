import { useQueries } from '@tanstack/react-query'
import React from 'react'
import { Container, Card, Row, ListGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { alchemy } from '../../Lib';
import Loader from '../Loader/loader';
import TableOfBlocks from '../Table/TableOfTransactions/tableOfBlocks';
import './block.css'



const Block = () => {
    const { hash } = useParams()

    const [{ data: block, isLoading, error },
        { data: gasPrice }] = useQueries({
            queries: [
                {
                    queryKey: ['block', hash],
                    queryFn: () => hash ? alchemy.core.getBlockWithTransactions(hash) : alchemy.core.getBlock(),
                },
                {
                    queryKey: ['gasPrice', hash],
                    queryFn: () => alchemy.core.getGasPrice()
                }]


        })
    console.log(gasPrice)
    const date = new Date(block?.timestamp * 1000).toLocaleString()

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return 'Error retrieving the data, please try again';
    }
    return (
        <Container className='mt-5'>
            <Card>
                <Card.Body className='blockCard'>
                    <Card.Title >
                        <Row>
                            Block Height: {block.number}
                        </Row>
                    </Card.Title>
                    <Card.Subtitle>
                        <Row>
                            Timestamp: {date}
                        </Row>
                    </Card.Subtitle>
                    <Card.Text>
                        <Row>
                            Transactions: {block.transactions.length}
                        </Row>
                    </Card.Text>
                    <Card.Text>
                        <Row>
                            Hash: {block.hash}
                        </Row>
                    </Card.Text>
                    <Card.Text>
                        <Row>
                            Miner: {block.miner}
                        </Row>
                    </Card.Text>
                    <Card.Text>
                        <Row>
                            Gas used: {block?.gasUsed.toString() / 10 ** 9} gwei
                        </Row>
                    </Card.Text>
                    <Card.Text>
                        <Row>
                            Gas price: {gasPrice?.toString() / 10 ** 9} gwei
                        </Row>

                    </Card.Text>
                    <Card.Text>
                        <ListGroup>
                            <TableOfBlocks number={block.number} />
                        </ListGroup>
                    </Card.Text>
                </Card.Body>

            </Card>
        </Container>
    )
}

export default Block