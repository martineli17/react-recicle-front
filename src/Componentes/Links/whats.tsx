import React from 'react';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

type Props = {
    numeroTelefone: string;
}

export default function WhatsLink(props:Props) {
    const numeroCustomizado = props.numeroTelefone.padStart(2).includes("55") 
                            ? props.numeroTelefone 
                            : `55${props.numeroTelefone}`;
    return (
        <>
            <a className="float-right" target="_blank" href={`https://wa.me/${numeroCustomizado}`}>
                <b>Iniciar conversa?</b> <WhatsAppIcon />
            </a>
        </>
    )
}