import { ListGroup, ListGroupItem } from "react-bootstrap"
import { useQueries } from "@tanstack/react-query";
import { alchemy } from '../../Lib';
import Loader from "../Loader/loader";



const TransactionCard = (hash) => {

    const [{
        data: transaction,
        isLoading,
        error,
    }, { data: receipt }] = useQueries({
        queries: [
            {
                queryKey: ['transaction', hash.hash],
                queryFn: () => alchemy.core.getTransaction(hash.hash),
            },
            {
                queryKey: ['receipt', hash.hash],
                queryFn: () => alchemy.core.getTransactionReceipt(hash.hash),
            }
        ]
    });
    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return 'Error! Please try again.';
    }
    console.log(transaction.value.toString() / 10 ** 9)
    const wasMined = !!receipt;


    // const [txDetails, setTxDetails] = useState({})

    // useEffect(() => {
    //     async function detailedTransaction() {
    //         const tx = await alchemy.core.getTransactionReceipt(transaction.transaction)
    //         console.log(tx)
    //         setTxDetails(tx)
    //     }
    //     detailedTransaction()
    // }, [])

    // console.log(txDetails)
    return <>
        {
            transaction ?
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start">
                    <div>{`${transaction.hash.slice(0, 10)}...`}</div>
                    <div>
                        {`from: ${transaction.from.slice(0, 6)}...`}
                        <br />
                        {`to: ${transaction.to.slice(0, 6)}...`}
                    </div>
                    <div>{(transaction.value.toString() / 10 ** 18).toFixed(4)}</div>
                </ListGroup.Item > :
                <Loader />
        }
    </>

}

export default TransactionCard