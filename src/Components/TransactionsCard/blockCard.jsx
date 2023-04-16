import { ListGroup } from "react-bootstrap"
import { alchemy } from '../../Lib';
import Loader from "../Loader/loader";
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


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
        return 'Error retrieving the data, please try again';
    }

    return <>
        {
            block &&
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start">
                <div><Link to={`/block/${block.hash}`}>{block.number}</Link></div>
                <div>
                    {`Fee recepient: ${block.miner.slice(0, 6)}...`}
                    <br />
                    {`${block.transactions.length} Transactions `}
                </div>
                <div>
                    <div>{(block.gasUsed.toString() / 10 ** 18).toFixed(6)}</div>
                </div>
            </ListGroup.Item >}

    </>

}

export default BlockCard