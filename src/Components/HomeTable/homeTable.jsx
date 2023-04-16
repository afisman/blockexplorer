import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { alchemy } from '../../Lib';
import { Container } from 'react-bootstrap';
import TableOfTransactions from '../Table/TableOfTransactions/tableOfTransactions';
import Loader from '../Loader/loader';


const HomeTable = () => {
    const { hash } = useParams()

    const { data: block, isLoading, error } = useQuery({
        queryKey: ['block', hash],
        queryFn: () => hash ? alchemy.core.getBlockWithTransactions(hash) : alchemy.core.getBlock(),

    })

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return 'Error retrieving the data, please try again.';
    }


    console.log(block)
    return (
        <>
            <Container className="mb-5 mt-5 mr-5 ml-5">
                <TableOfTransactions hash={block.number} transactions={block.transactions.slice(0, 10)} />
            </Container>
        </>

    )
}

export default HomeTable
