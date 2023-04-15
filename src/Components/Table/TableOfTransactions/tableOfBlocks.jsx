import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
import TransactionCard from '../../TransactionsCard/transactionCard';
import { useQuery } from "@tanstack/react-query";
import { alchemy } from '../../../Lib';
import { Utils } from 'alchemy-sdk';


import './tableOfTransactions.css'
import { ListGroup, Row } from 'react-bootstrap';
import Loader from '../../Loader/loader';
import BlockCard from '../../TransactionsCard/blockCard';


const TableOfBlocks = ({ number }) => {

    console.log(typeof number)
    const blocksArr = []
    const { data: logs, isLoading, error, } = useQuery({
        queryKey: ['logs', number],
        queryFn: () => {
            const block2 = Utils.hexlify(number - 10)
            const block = Utils.hexlify(number)
            console.log(block2)

            return alchemy.core.getLogs({ fromBlock: block2, toBlock: block })
        }
    })
    logs?.forEach((item) => {
        if (blocksArr.some(el => el.blockNumber === item.blockNumber) === false) {
            blocksArr.push(item);
        }
    })
    console.log(blocksArr[0]?.blockHash)

    if (isLoading) {
        return 'Loading...';
    }

    if (error) {
        return 'Error! Please try again.';
    }
    return <>
        {
            blocksArr ?
                blocksArr?.reverse().slice(0, 10).map((transaction) => {
                    return (
                        <ListGroup.Item><BlockCard transaction={transaction.blockHash} /></ListGroup.Item>

                    )
                })
                : <Loader />
        }

    </>
}

export default TableOfBlocks