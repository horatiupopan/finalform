/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import { Form, Field } from 'react-final-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
}
  
const asyncValidate = async value => {
    await sleep(2000);
    if (value === 'Smith') {
        return "Last name cannot be Smith!";
    }
};

const MyForm = () => {
    
    return (
        <Form
        onSubmit={onSubmit}
        validate={values => {
            const errors = {};
            if (!values.firstName) {
                errors.firstName = 'Required';
            } else if (values.firstName.length > 10) {
                errors.firstName = 'Must be 10 characters or less';
            }
            if (!values.lastName) {
                errors.lastName = 'Required';
            }
            return errors;
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
                <Field name="firstName">
                    {({ input, meta }) => (
                    <div>
                        <label>First Name</label>
                        <input {...input} type="text" placeholder="First Name" />
                        {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                    )}
                </Field>
                <Field name="lastName" validate={asyncValidate}>
                    {({ input, meta }) => (
                    <div>
                        <label>Last Name</label>
                        <input {...input} type="text" placeholder="Last Name" />
                        {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                    )}
                </Field>
                <div className="buttons">
                    <button type="submit" disabled={submitting || pristine}>
                    Submit
                    </button>
                    <button
                        type="button"
                        onClick={form.reset}
                        disabled={submitting || pristine}
                    >
                        Reset
                    </button>
                </div>
            </form>
        )}
        />
    );
};

export default MyForm;
