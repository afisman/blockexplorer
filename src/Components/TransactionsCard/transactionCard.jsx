import { ListGroup } from "react-bootstrap"
import { useQuery } from "@tanstack/react-query";
import { alchemy } from '../../Lib';
import Loader from "../Loader/loader";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';



const TransactionCard = ({ hash }) => {

    const {
        data: transaction,
        isLoading,
        error,
    } = useQuery({

        queryKey: ['transaction', hash],
        queryFn: () => alchemy.core.getTransaction(hash),

    });
    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return 'Error! Please try again.';
    }
    console.log(transaction.value.toString() / 10 ** 9)

    return <>
        {
            transaction ?
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start">
                    <Link to={`/transaction/${transaction.hash}`}>{`${transaction.hash.slice(0, 10)}...`}</Link>
                    <div></div>
                    <div>
                        from:<Link to={`/transaction/${transaction.from}`}>{` ${transaction.from.slice(0, 6)}...`}</Link>
                        <br />
                        to: <Link to={`/transaction/${transaction.to}`}>{` ${transaction.to.slice(0, 6)}...`}</Link>
                    </div>
                    <div>{(transaction.value.toString() / 10 ** 18).toFixed(4)}</div>
                </ListGroup.Item > :
                <Loader />
        }
    </>

}

export default TransactionCard