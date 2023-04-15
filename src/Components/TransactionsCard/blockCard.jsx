import { Col, ListGroup } from "react-bootstrap"
import { useEffect, useState } from 'react';
import { alchemy } from '../../Lib';
import Loader from "../Loader/loader";
import { useQuery } from "@tanstack/react-query";


const BlockCard = ({ transaction }) => {
    console.log(transaction)
    const { data: block, isLoading, error } = useQuery({
        queryKey: ['block', transaction],
        queryFn: () => alchemy.core.getBlockWithTransactions(transaction)

    })

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return 'Error! Please try again.';
    }

    return <>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start">
            <div>{block.number}</div>
            <div>
                {`Fee recepient: ${block.miner.slice(0, 6)}...`}
                <br />
                {`${block.transactions.length} Transactions `}
            </div>
            <div>
                <div>{(block.gasUsed.toString() / 10 ** 18).toFixed(6)}</div>
            </div>
        </ListGroup.Item >

    </>

}

export default BlockCard