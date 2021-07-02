import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

type PropsLoading = {
    status: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }),
);

export default function LoadingComponent({ status }: PropsLoading) {
    const classes = useStyles();
    return (
        <>
            {
                status &&
                <div className={classes.root}>
                    <LinearProgress  style={{backgroundColor: "white"}}/>
                </div>
            }
        </>
    )
}