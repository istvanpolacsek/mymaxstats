import * as yup from 'yup';
import { useSession } from 'next-auth/client';
import { Formik, FieldArray } from 'formik';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { Container } from 'react-bootstrap';
import { FiArrowLeft, FiCheck, FiPlus, FiX } from 'react-icons/fi';
import { primaries } from '../utils/primaries.json';

const NewTable = () => {
    const [session] = useSession();
    const date = new Date();
    const router = useRouter();

    const recordSchema = yup.object().shape({
        record: yup.string().required(),
        value: yup.number().min(0),
        uom: yup.string().required(),
        primary: yup.boolean().required(),
    })
    
    const recordTableSchema = yup.object().shape({
        year: yup.number().required().positive().integer().min(2000).max(3000),
        month: yup.number().required().positive().integer().min(1).max(12),
        records: yup.array().of(recordSchema),
        uid: yup.string()
    })

    const [form, setForm] = useState({ 
        year: date.getFullYear(), 
        month: date.getMonth() + 1,
        records: [],
        userid: null
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (session && form.records.length < 5) {
        form.userid = session.user.id;
        primaries.forEach(primary => form.records.push({
            record: primary,
            value: 0,
            uom: 'kg',
            primary: true
        }))   
    }

    const handleSubmit = (form) => {
        setIsSubmitting(true)
        createRecordTable(form);
    }

    const createRecordTable = async (form) => {
        try {
            const res = await fetch('/api/recordtables/', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            })
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const goBack = () => {
        router.back();
    }

    return (
        <Container style={{ paddingTop: 80 }}>
            <Button variant="outline-secondary" style={{ marginBottom: 15}} onClick={goBack}><FiArrowLeft/></Button>
            <Formik
                validationSchema={recordTableSchema}
                onSubmit={handleSubmit}
                initialValues={form}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <h5 className="text-secondary">New Table</h5>
                        <Form.Row>
                            <Form.Group as={Col} controlId="validationYear">
                                <Form.Control
                                    type="number"
                                    name="year"
                                    placeholder="year"
                                    value={values.year}
                                    onChange={handleChange}
                                    isValid={touched.year && !errors.year}
                                    isInvalid={errors.year}
                                />  
                                <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} controlId="validationMonth">
                                <Form.Control
                                    type="number"
                                    name="month"
                                    placeholder="month"
                                    value={values.month}
                                    onChange={handleChange}
                                    isValid={touched.month && !errors.month}
                                    isInvalid={errors.month}
                                />
                                <Form.Control.Feedback type="invalid">{errors.month}</Form.Control.Feedback>                                
                            </Form.Group>
                        </Form.Row>
                        <h5 className="text-secondary">Records</h5>
                        <FieldArray
                            name="records"
                            render={arrayHelpers => (
                                <>
                                {values.records && values.records.length > 0 && (
                                    values.records.map((record, index) => (
                                        <Form.Row key={index}>
                                            <Form.Group as={Col} md="6">
                                                <Form.Control 
                                                    type="string"
                                                    name={`records.${index}.record`}
                                                    placeholder="e.g. Back Squat"
                                                    value={record.record}
                                                    onChange={handleChange}
                                                    disabled={record.primary}
                                                    isValid={
                                                        touched.records && touched.records[index] && touched.records[index].record && 
                                                        !(errors.records && errors.records[index] && errors.records[index].record)
                                                    }
                                                    isInvalid={errors.records && errors.records[index] && errors.records[index].record}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} >
                                                <Form.Control 
                                                    type="number"
                                                    name={`records.${index}.value`}
                                                    placeholder="e.g. 100"
                                                    value={record.value}
                                                    onChange={handleChange}
                                                    isValid={
                                                        touched.records && touched.records[index] && touched.records[index].value && 
                                                        !(errors.records && errors.records[index] && errors.records[index].value)
                                                    }
                                                    isInvalid={errors.records && errors.records[index] && errors.records[index].value}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} >
                                                <Form.Control 
                                                    as="select"
                                                    type="string"
                                                    name={`records.${index}.uom`}
                                                    placeholder="e.g. kg"
                                                    value={record.uom || ''}
                                                    onChange={handleChange}
                                                    disabled={record.primary}
                                                    isValid={
                                                        touched.records && touched.records[index] && touched.records[index].uom && 
                                                        !(errors.records && errors.records[index] && errors.records[index].uom)
                                                    }
                                                    isInvalid={errors.records && errors.records[index] && errors.records[index].uom}                                                    
                                                >
                                                    <option></option>
                                                    <option>kg</option>
                                                    <option>m</option>
                                                    <option>rep</option>
                                                    <option>sec</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group as={Col} >
                                                <Button block variant="outline-secondary" onClick={() => arrayHelpers.remove(index)} disabled={record.primary}><FiX/></Button>
                                            </Form.Group>
                                        </Form.Row>
                                    ))
                                )}
                                <Form.Row className="justify-content-end">
                                    <Form.Group as={Col} md="2">
                                        <Button block variant="outline-secondary" onClick={() => arrayHelpers.push({ record: '', value: '', uom: '', primary: false })}><FiPlus/></Button>
                                    </Form.Group>
                                </Form.Row>
                                </>
                            )}
                        />
                        <Button block size="lg" variant="outline-success" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <Spinner as="span" animation="border"/> : <FiCheck/>}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}

export default NewTable