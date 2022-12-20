import React, { use, useState } from 'react'
import Form from 'react-bootstrap/Form'
import { Row, Col, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { InputGroup } from 'react-bootstrap'
import { useAtom } from 'jotai'
import { finalAmountAtom, totalContributionAtom, totalInterestAtom, warningAtom } from '../store.js'

const Values = () => {

    const { register, handleSubmit} = useForm({
        defaultValues: {
            principalAmount: 10000,
            years: 10,
            annualReturn: 10,
            annualContribution: 1000,
        }
    })
    const [finalAmount, setFinalAmount] = useAtom(finalAmountAtom)
    const [totalContribution, setTotalContribution] = useAtom(totalContributionAtom)
    const [totalInterest, setTotalInterest] = useAtom(totalInterestAtom)
    const [warning, setWarning] = useAtom(warningAtom)

    async function submitForm(data) {
        if (!data.annualReturn || !data.years || !data.principalAmount)
            setWarning("Annual Return, Years and, Principal Amount are required.")
        else
            setWarning(false)
            await calculateFinalAmount(data);
    }

    async function calculateFinalAmount(data) {
        var r = parseFloat(data.annualReturn) / 100;
        var t = parseFloat(data.years);
        var P = parseFloat(data.principalAmount);
        var C = parseFloat(data.annualContribution);
        (isNaN(C)) && (C = 0);
        var A = P * (Math.pow(1 + r, t)) + (C * ((Math.pow(1 + r, t) - 1) / (r)));
        (isNaN(A) && (A = P + (C*t)));
        A = Math.round((A + Number.EPSILON) * 100) / 100;
        var I = Math.round((A - P - (C * t) + Number.EPSILON) * 100) / 100;

        var finalAmount = A.toLocaleString("en-US");
        var totalContribution = (C * t).toLocaleString("en-US")
        var totalInterest = I.toLocaleString("en-US")

        await setFinalAmount(finalAmount);
        await setTotalContribution(totalContribution);
        await setTotalInterest(totalInterest);
    }
    return (
        <div>
            <Form className='form-control' onSubmit={handleSubmit(submitForm)}>
                <Row className='mb-2'>
                    <Form.Label column="md" lg={4}>
                        Principal Amount
                    </Form.Label>
                    <Col lg={5}>
                        <InputGroup >
                            <InputGroup.Text >$</InputGroup.Text>
                            <Form.Control size="md" type="decimal" {...register('principalAmount')} />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Form.Label column="md" lg={4}>
                        Investment Length
                    </Form.Label>
                    <Col xs={5}>
                        <InputGroup>
                            <Form.Control size="md" type="decimal" {...register('years')} />
                            <InputGroup.Text >Years</InputGroup.Text>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Form.Label column="md" lg={4}>
                        Annual Return
                    </Form.Label>
                    <Col xs={5}>
                        <InputGroup>
                            <Form.Control size="md" type="decimal" {...register('annualReturn')} />
                            <InputGroup.Text >%</InputGroup.Text>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Form.Label column="md" lg={4}>
                        Annual contribution
                    </Form.Label>
                    <Col xs={5}>
                        <InputGroup >
                            <InputGroup.Text >$</InputGroup.Text>
                            <Form.Control size="md" type="decimal" {...register('annualContribution')} />
                        </InputGroup >
                    </Col>
                </Row>
                <Button type="submit" variant="success">Calculate</Button>
            </Form>
        </div>
    )
}

export default Values

