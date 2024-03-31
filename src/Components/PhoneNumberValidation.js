import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FormHelperText } from '@mui/material';

const PhoneNumberValidation = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [valid, setValid] = useState(true);
    const [touched, setTouched] = useState(false);

    const handleChange = (value) => {
        setPhoneNumber(value);
        setTouched(false); // Reset touched state when user starts typing
        if (value.trim() !== '') {
            setValid(validatePhoneNumber(value)); // Validate only if the input is not empty
        }
    };

    const handleBlur = () => {
        if (phoneNumber.trim() === '') {
            setTouched(true);
            setValid(false);
        }
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
        return phoneNumberPattern.test(phoneNumber);
    };

    return (
        <div>
            <label>
                Phone Number:
                <PhoneInput
                    country={'in'}
                    value={phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur} // Trigger validation on blur
                    inputProps={{
                        required: true,
                    }}
                    inputStyle={{
                        width: '100%',
                        height: '40px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '16px',
                    }}
                />
            </label>
            {(touched || valid === false) && (
                <FormHelperText sx={{ marginLeft: '10px' }} error>*Please enter a valid phone number.</FormHelperText>
            )}
        </div>
    );
};

export default PhoneNumberValidation;
