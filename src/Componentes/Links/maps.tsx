import React from 'react';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';

type Props = {
    numero: string;
    rua: string;
    bairro: string;
    cidade: string;
    uf: string;
}

export default function MapsLink(props: Props) {
    return (
        <>
            <a className="float-right" target="_blank" 
            href={`https://www.google.com/maps/place/${props.numero} ${props.rua} ${props.bairro} ${props.cidade} ${props.uf}`}>
                <b>Ver no Maps?</b> <ImageSearchIcon />
            </a>
        </>
    )
}