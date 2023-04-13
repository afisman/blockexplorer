import { Col } from "react-bootstrap"
import { useEffect, useState } from 'react';
import { alchemy } from '../../Lib';
import Loader from "../Loader/loader";



const Transaction = (hash,) => {
    console.log(hash.hash)


    return <>

        {
            // txDetails.from && txDetails.to
            //     ?
            //     <>

            //         <Col>{`from: ${txDetails.from.slice(0, 6)}...${txDetails.from.slice(38)}`}</Col>

            //         <Col>{`to: ${txDetails.to.slice(0, 6)}...`}</Col>
            //     </>

            //     :

        }

        <Loader />


    </>

}

export default Transaction