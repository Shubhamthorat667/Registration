import "./Registration.css"
import { Grid, Select, MenuItem, Paper, ListItemText, Avatar, Typography, TextField, Button, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Checkbox, FormHelperText } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";



function Registration() {

    const paperStyle = { padding: 20, width: 350, margin: "0 auto", borderRadius: 8 };
    const headerStyle = { margin: 10 };
    const avatarStyle = { backgroundColor: '#3598dc' };
    const inputContainerStyle = { marginBottom: 20 }; // Add margin bottom to create space between input fields

    // Function to handle image preview
    const handleImageChange = (e, setFieldValue) => {
        const file = e.currentTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFieldValue("image", file);
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const [imagePreview, setImagePreview] = useState(null);
    const handleRemoveImage = (setFieldValue) => {
        setFieldValue("image", null);
        setImagePreview(null);
    };

    //Amount 
    const currencies = [
        {
            value: 'rupees',
            label: 'Rupees (₹)',
            symbol: '₹',
        },
        {
            value: 'dollar',
            label: 'Dollar ($)',
            symbol: '$',
        },
        {
            value: 'other',
            label: 'Other',
            symbol: '',
        },
    ];

    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('rupees');

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };

   
   
    const initialValues = {
        name: '',
        email: '',
        gender: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        domain: '',
        skills: [],
        website: '',
        amount: '',
        image: null,
        termsAndConditions: false,
        birthDate: '',
        about: ''

    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "It's too short").required("*Username is required"),
        email: Yup.string().email("Enter valid email").required("*Email is required"),
        gender: Yup.string().oneOf(["male", "female"], "Required").required("*Required"),
        phoneNumber: Yup.number().min(1000000000, "Not a valid phone number").max(9999999999, "Not a valid phone number").typeError("Enter valid Phone Number").required('*Phone no is required'),
        password: Yup.string().matches(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
            "*Password must contain at least 8 characters, one capital letter, one number, and one symbol"
        ).required("*Password is required"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "*Password not matched").required("*Required"),
        domain: Yup.string().max(1, "").required("*Select domain"),
        skills: Yup.array().min(3, "*Select at least three skill"),
        website: Yup.string().url("*Enter a valid URL").required("*Required"),
        amount: Yup.number().min(1000, "*min 4 digit amount").max(9999999, "*only upto 7 digits").typeError("Enter valid Number").required('*Amount is required'),
        image: Yup.mixed().required("*Image is Required").test('fileSize', "File size too large", (value) => value && value.size <= 5242880), // 5MB limit
        birthDate: Yup.date().required("*Birthdate is required"),
        about: Yup.string().min(50, "It's too short").required("*About section is required"),

        termsAndConditions: Yup.string().oneOf(["true"], "*Accept terms & conditions")
    });

    const onSubmit = (values, props) => {
        console.log("Form Values",values);
        console.log(props);
        setTimeout(() => {
            toast.success("Form submitted successfully!"); // Show success toast notification
            props.resetForm();
            props.setSubmitting(false);
        }, 1000);
    };
    // const onSubmit = (values, props) => {
    //     console.log("Form values:", values); // Log form values to console
    //     toast.success("Form submitted successfully!"); // Show success toast notification
    //     props.resetForm();
    //     props.setSubmitting(false);
    // };
    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh", backgroundColor: '#3598dc' }}>
            <Paper style={paperStyle}>

                {/* Header section */}
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <HowToRegIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Registration</h2>
                    <Typography variant='caption' gutterBottom>Welcome! Please complete the form below to create your account.</Typography>
                </Grid>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {(props) => (
                        <Form>

                            {/* 1. Username */}
                            <div style={inputContainerStyle}>
                                <Field as={TextField} fullWidth name="name" label='Name'
                                    placeholder="Enter your name" helperText={<ErrorMessage name="name" />} />
                            </div>

                            {/* 2. Email Address */}
                            <div style={inputContainerStyle}>
                                <Field as={TextField} fullWidth name="email" label='Email'
                                    placeholder="Enter your email" helperText={<ErrorMessage name="email" />} />
                            </div>

                            {/* 3. Gender and Birthdate div */}
                                 <div style={inputContainerStyle}>
                                <FormControl component="fieldset" sx={{ marginLeft: '8px' }}>
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <Field as={RadioGroup} aria-label="gender" name="gender">
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    </Field>
                                    <FormHelperText><ErrorMessage name="gender" /></FormHelperText>
                                </FormControl>
                                <FormControl component="fieldset" sx={{ marginLeft: '70px' }}>
                                    <FormLabel component="legend">Birthdate</FormLabel>
                                    <Field
                                        as={TextField} // Use TextField instead of DatePicker
                                        type="date" // Set type to 'date' for native date input
                                        name="birthDate"
                                        label=""
                                        fullWidth
                                    />
                                    <FormHelperText><ErrorMessage name="birthDate" /></FormHelperText>
                                </FormControl>
                            </div>
                            

                            {/* 4. Phone number */}
                            <div style={inputContainerStyle}>
                                <Field as={TextField} fullWidth name="phoneNumber" label='Phone Number'
                                    placeholder="Enter your phone number" helperText={<ErrorMessage name="phoneNumber" />} />
                            </div>

                            {/* 5. Password*/}
                            <div style={inputContainerStyle}>
                                <Field as={TextField} fullWidth name='password' type="password"
                                    label='Password' placeholder="Enter your password"
                                    helperText={<ErrorMessage name="password" />} />
                            </div>

                            {/* 6. Confirm Password*/}
                            <div style={inputContainerStyle}>
                                <Field as={TextField} fullWidth name="confirmPassword" type="password"
                                    label='Confirm Password' placeholder="Confirm your password"
                                    helperText={<ErrorMessage name="confirmPassword" />} />
                            </div>

                            {/* 7. Select Domain*/}
                            <div style={inputContainerStyle}>
                                <FormControl fullWidth error={props.touched.domain && Boolean(props.errors.domain)}>
                                    <Select
                                        labelId="domain-label"
                                        id="domain"
                                        name="domain"
                                        displayEmpty
                                        placeholder="Select Domain"
                                        value={props.values.domain}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                    >
                                        <MenuItem value="" disabled>Select Domain</MenuItem>
                                        <MenuItem value="IT">IT</MenuItem>
                                        <MenuItem value="HR">HR</MenuItem>
                                        <MenuItem value="Developer">Developer</MenuItem>
                                        <MenuItem value="Manager">Manager</MenuItem>
                                    </Select>
                                    <FormHelperText>{props.touched.domain && props.errors.domain}</FormHelperText>
                                </FormControl>
                            </div>

                            {/* 8. Select Skills*/}
                            <div style={inputContainerStyle}>
                                <FormControl fullWidth error={props.touched.skills && Boolean(props.errors.skills)}>
                                    <FormLabel component="legend">Skills</FormLabel>
                                    <Select
                                        labelId="skills-label"
                                        id="skills"
                                        multiple
                                        name="skills"
                                        value={props.values.skills}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        displayEmpty
                                        renderValue={(selected) => selected.join(', ')}
                                        fullWidth
                                        placeholder="Select Skills"
                                        MenuProps={{
                                            PaperProps: {
                                                style: {
                                                    maxHeight: 300,
                                                    width: 250,
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem disabled>
                                            <Checkbox checked={false} disabled />
                                            <ListItemText primary="Select Skills" />
                                        </MenuItem>
                                        <MenuItem value="JavaScript">
                                            <Checkbox checked={props.values.skills.indexOf("JavaScript") > -1} />
                                            <ListItemText primary="JavaScript" />
                                        </MenuItem>
                                        <MenuItem value="React">
                                            <Checkbox checked={props.values.skills.indexOf("React") > -1} />
                                            <ListItemText primary="React" />
                                        </MenuItem>
                                        <MenuItem value="Node.js">
                                            <Checkbox checked={props.values.skills.indexOf("Node.js") > -1} />
                                            <ListItemText primary="Node.js" />
                                        </MenuItem>
                                        <MenuItem value="Java">
                                            <Checkbox checked={props.values.skills.indexOf("Java") > -1} />
                                            <ListItemText primary="Java" />
                                        </MenuItem>
                                        <MenuItem value="AI & ML">
                                            <Checkbox checked={props.values.skills.indexOf("AI & ML") > -1} />
                                            <ListItemText primary="AI & ML" />
                                        </MenuItem>
                                        <MenuItem value="Blockchain">
                                            <Checkbox checked={props.values.skills.indexOf("Blockchain") > -1} />
                                            <ListItemText primary="Blockchain" />
                                        </MenuItem>
                                        <MenuItem value="Python">
                                            <Checkbox checked={props.values.skills.indexOf("Python") > -1} />
                                            <ListItemText primary="Python" />
                                        </MenuItem>
                                    </Select>
                                    <FormHelperText>{props.touched.skills && props.errors.skills}</FormHelperText>
                                </FormControl>
                            </div>

                            {/* 9. Link*/}
                            <div style={inputContainerStyle}>
                                <Field as={TextField} fullWidth name="website" label='Website'
                                    placeholder="Enter your website URL" helperText={<ErrorMessage name="website" />} />
                            </div>

                            {/* 10. Amount*/}
                            <div style={inputContainerStyle}>
                                <TextField
                                    select
                                    label="Currency"
                                    value={currency}
                                    onChange={handleCurrencyChange}

                                >
                                    {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <Field as={TextField}
                                    name="amount" label='Amount' style={{ marginLeft: 15 }}
                                    placeholder="Enter your Amount"
                                    helperText={<ErrorMessage name="amount" />}
                                />
                            </div>

                           {/* 11. About*/}
                            <div style={inputContainerStyle} >
                                <Field as={TextField} fullWidth name="about" label='About Section' multiline
                                    rows={4} id="outlined-multiline-static"
                                    placeholder="Write here.." helperText={<ErrorMessage name="about" />} />
                            </div>

                            {/* 12. Upload image */}
                            <div style={inputContainerStyle}>
                                <FormControl fullWidth error={props.touched.image && Boolean(props.errors.image)}>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="image"
                                        name="image"
                                        type="file"
                                        onChange={(e) => handleImageChange(e, props.setFieldValue)}
                                    />
                                    <label htmlFor="image">
                                        <Button variant="outlined" component="span">
                                            Upload Image
                                        </Button>
                                    </label>
                                    {imagePreview && (
                                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                            <img src={imagePreview} alt="Preview" style={{ maxWidth: '100px' }} />
                                            <Button onClick={() => handleRemoveImage(props.setFieldValue)} style={{ marginLeft: '10px' }}><ClearIcon /></Button>
                                        </div>
                                    )}
                                    <FormHelperText>{props.touched.image && props.errors.image}</FormHelperText>
                                </FormControl>
                            </div>

                            {/* 13. Condition checkbox*/}
                            <div style={inputContainerStyle}>
                                <FormControlLabel
                                    control={<Field as={Checkbox} name="termsAndConditions" />}
                                    label="I accept the terms and conditions."
                                />
                                <FormHelperText><ErrorMessage name="termsAndConditions" /></FormHelperText>
                            </div>

                             {/*Submit*/}   
                            <div style={inputContainerStyle}>
                                <Button type='submit' variant='contained' disabled={props.isSubmitting}
                                    color='primary'>{props.isSubmitting ? "Loading" : "Sign up"}</Button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </Paper>
            {/* <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> */}
        </Grid>
    );
}

export default Registration;