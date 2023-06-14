import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import { useMyContext } from '../contexts/MainContext';

type VoucherProps = {
    amount: string;
};

const useStyles = makeStyles({
    box: {
        backgroundColor: '#CDFB5D',
        border: '2px solid #FFF',
        padding: '15px',
    },
});

const Voucher = ({ amount }: VoucherProps) => {
    const classes = useStyles();
    const { data = '' } = useMyContext();

    return (
        <Box className={classes.box}>
            <Typography variant="h2" color="red">
                Digital Money House
            </Typography>
            <Typography variant="body1" color="black">
                Transferencia
            </Typography>
            <Typography variant="caption" color="black">
                ${amount}
            </Typography>
            <br />
            <Typography variant="caption" color="black">
                Transferido a: {data}
            </Typography>
        </Box>
    );
};

export default Voucher;
