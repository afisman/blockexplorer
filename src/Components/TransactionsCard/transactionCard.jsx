import { ListGroup } from "react-bootstrap"
import { useQueries } from "@tanstack/react-query";
import { alchemy } from '../../Lib';
import Loader from "../Loader/loader";



const TransactionCard = (hash) => {

    const [{
        data: transaction,
        isLoading,
        error,
    }, { data: receipt, isFetched: isFetchedReceipt }] = useQueries({
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
    console.log(transaction)
    const wasMined = !!receipt;

    console.log(receipt)

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
                <ListGroup horizontal>
                    <ListGroup.Item>{`from: ${transaction.from.slice(0, 6)}...${transaction.from.slice(38)}`}</ListGroup.Item>
                    <ListGroup.Item>{`to: ${transaction.to.slice(0, 6)}...`}</ListGroup.Item>
                    <ListGroup.Item>renders</ListGroup.Item>
                    <ListGroup.Item>horizontally!</ListGroup.Item>
                </ListGroup> :
                <Loader />
        }
    </>

}

export default TransactionCard