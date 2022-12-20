import React from 'react'
import { Table } from 'react-bootstrap'
import { useAtom } from 'jotai'
import { finalAmountAtom, totalInterestAtom, totalContributionAtom } from '../store'

const Result = () => {

    const [finalAmount, setFinalAmount] = useAtom(finalAmountAtom)
    const [totalContribution, setTotalContribution] = useAtom(totalContributionAtom)
    const [totalInterest, setTotalInterest] = useAtom(totalInterestAtom) 

    return (
        <>
            <Table  striped="columns" bordered>
                <thead>
                    <tr>
                        <th>Final Amount </th>
                        <td><strong>$</strong>{finalAmount}</td>
                    </tr>
                    <tr>
                        <th>Total Additional Contribution</th>
                        <td><strong>$</strong>{totalContribution}</td>
                    </tr>
                    <tr>
                        <th>Total Interest   </th>
                        <td><strong>$</strong>{totalInterest}</td>
                    </tr>
                    <tr></tr>
                </thead>
            </Table>
        </>
    )
}
export default Result
