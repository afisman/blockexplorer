import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { alchemy } from '../../Lib';
import { Card, Container, Row } from 'react-bootstrap';
import './block.css'
import TableOfTransactions from '../TableOfTransactions/tableOfTransactions';


const Block = () => {
    const { hash } = useParams()

    const { data: block, isLoading, error } = useQuery({
        queryKey: ['block', hash],
        queryFn: () => hash ? alchemy.core.getBlockWithTransactions(hash) : alchemy.core.getBlock(),
        refetchInterval: !hash ? 1200 : null,

    })

    if (isLoading) {
        return 'Loading...';
    }

    if (error) {
        return 'Error! Please try again.';
    }

    const date = new Date()

    console.log(block.transactions.slice(0, 20))
    return (
        <>
            <Container className="mb-5 mt-5 mr-5 ml-5">
                <Card>
                    <Card.Body className='blockCard'>
                        <Card.Title >
                            <Row>
                                Block Height: {block.number}
                            </Row>
                        </Card.Title>
                        <Card.Subtitle>
                            <Row>
                                Timestamp: {block.timestamp}
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
                                Difficulty: {block.difficulty}
                            </Row>
                        </Card.Text>
                        <Card.Text>
                            <Row>
                                Nonce: {block.nonce}
                            </Row>

                        </Card.Text>
                    </Card.Body>

                </Card>
                <TableOfTransactions hash={block.hash} transactions={block.transactions.slice(0, 20)} />
            </Container>
        </>

    )
}

export default Block
