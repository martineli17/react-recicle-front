import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle }
    from '@material-ui/core';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ButtonCustom } from '../Button/Button';

type ModalProps = {
    StatusModal: boolean,
    Text?: any,
    Cabecalho: any,
    ComponentView: any,
    FunctionSuccess?: Function,
    FunctionClose: Function,
    TextButtomSuccess?: String,
    TextButtomDanger?: String,
    ViewButtomSucess?: boolean,
}

export default function Modal({ Cabecalho, ComponentView, Text, StatusModal,
    FunctionSuccess, FunctionClose, ViewButtomSucess = true,
    TextButtomSuccess = "Confirmar", TextButtomDanger = "Cancelar" }: ModalProps) {
    function SetStateModal() {
        StatusModal = !StatusModal;
    }
    return (
        <>
            <Dialog  open={StatusModal} onClose={() => SetStateModal()} aria-labelledby="form-dialog-title">
                <DialogTitle style={{ backgroundColor: "#F5F5F5", color: "#181818",}} className="modalTitle" id="modal-cadastro">
                    {Cabecalho}
                </DialogTitle>
                <DialogContent style={{ backgroundColor: "#F5F5F5"}}> 
                    <DialogContentText align="left" className="modal-cadastro-content-text">
                        {Text}
                    </DialogContentText>
                    {ComponentView}
                </DialogContent>
                <DialogActions style={{ backgroundColor: "#F5F5F5", color: "#181818", borderTop:"2.5px solid rgba(0,0,0,0.5)",}} className="modalActions">
                    <Row>
                        <Col>
                            <ButtonCustom marginBottom={-20} onClick={FunctionClose} variant="danger"> 
                                {TextButtomDanger} 
                            </ButtonCustom>
                        </Col>
                        {
                            ViewButtomSucess ?
                            <Col>
                                <ButtonCustom marginBottom={-20} onClick={FunctionSuccess} variant="success"> 
                                    {TextButtomSuccess} 
                                </ButtonCustom>
                            </Col>
                            : null
                        }
                    </Row>
                </DialogActions>
            </Dialog>
        </>
    )
}
