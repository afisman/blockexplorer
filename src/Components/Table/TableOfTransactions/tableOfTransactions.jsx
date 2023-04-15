import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
import TransactionCard from '../../TransactionsCard/transactionCard';
import { useQuery } from "@tanstack/react-query";
import { alchemy } from '../../../Lib';
import { Utils } from 'alchemy-sdk';



import './tableOfTransactions.css'
import { Col, ListGroup, Row } from 'react-bootstrap';
import TableOfBlocks from './tableOfBlocks';
import BlockCard from '../../TransactionsCard/blockCard';
import Loader from '../../Loader/loader';


const TableOfTransactions = ({ hash, transactions }) => {

    console.log(transactions)
    console.log(hash)


    const blocksArr = []
    const { data: blocks, isLoading, error, } = useQuery({
        queryKey: ['blocks', hash],
        queryFn: () => {
            const block2 = Utils.hexlify(hash - 10)
            const block = Utils.hexlify(hash)
            console.log(block2)

            return alchemy.core.getLogs({ fromBlock: block2, toBlock: block })
        }
    })
    blocks?.forEach((item) => {
        if (blocksArr.some(el => el.blockNumber === item.blockNumber) === false) {
            blocksArr.push(item);
        }
    })
    console.log(blocksArr[0]?.blockHash)

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return 'Error! Please try again.';
    }

    return <>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Latest Blocks</th>
                    <th>Latest transactions</th>
                </tr>
            </thead>
            <tbody>
                <td>

                    <ListGroup>
                        {/* <TableOfBlocks number={hash} /> */}
                        {
                            blocksArr?.length > 0 &&
                            blocksArr.map((number) => {
                                console.log(number)
                                return <BlockCard transaction={number.blockNumber} />

                            })
                        }
                    </ListGroup>
                </td>
                <td>

                    <ListGroup>
                        {
                            transactions?.length > 0 &&
                            transactions.map((transaction) => {
                                console.log(transaction)
                                return <TransactionCard hash={transaction} />

                            })
                        }

                    </ListGroup>
                </td>
            </tbody>
        </Table>

    </>
}

export default TableOfTransactions