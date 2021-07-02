import React from 'react';
import { Alert as AlertM, AlertTitle } from '@material-ui/lab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type AlertInfoProps = {
    title: string;
    subTitle: string;
    type: "info" | "error" | "warning" | "success"
}
export default function Alert({ title, subTitle, type }: AlertInfoProps) {
    return (
        <Row className="justify-content-md-center mt-5">
            <Col sm={6}>
                <AlertM style={{ color: "white" }} variant="outlined" severity={type}>
                    <AlertTitle className="ml-2">{title}</AlertTitle>
                    {subTitle}
                    </AlertM>
            </Col>
        </Row>
    )

}