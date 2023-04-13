import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
import TransactionCard from '../TransactionsCard/transactionCard';
import { useQuery } from "@tanstack/react-query";
import { alchemy } from '../../Lib';


import './tableOfTransactions.css'
import { Row } from 'react-bootstrap';


const TableOfTransactions = (transactions) => {
    console.log(transactions)

    const [logs, setLogs] = useState([])

    useEffect(() => {
        console.log(transactions)
        setLogs(transactions.transactions)
    }, [])

    return <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Transaction hash</th>
                    <th>From</th>
                    <th>Value</th>
                    <th>To</th>

                </tr>
            </thead>
            <tbody>

                <Row>
                    {
                        logs?.length > 0 &&
                        logs.map((transaction) => {
                            console.log(transaction)
                            return <TransactionCard hash={transaction} />

                        })
                    }

                </Row>
            </tbody>
        </Table>

    </>
}

export default TableOfTransactions