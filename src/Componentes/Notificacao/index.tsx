import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { MensagemSnack } from '../../Types/Notificacao';


type Props = MensagemSnack & {
    OnClose: (event?: React.SyntheticEvent, reason?: string) => void;
}

export function SnackBarComponent({ status, mensagem, type, OnClose }: Props) {
    const classes = useStyles();
    return (
        <>
            {
                mensagem &&
                <div className={classes.root}>
                    <Snackbar open={status} autoHideDuration={5000} onClose={OnClose}>
                        <Alert onClose={OnClose} severity={type}>
                            {mensagem}
                        </Alert>
                    </Snackbar>
                </div>
            }
        </>

    );
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));