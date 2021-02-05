import * as yup from 'yup';
import { Formik, FieldArray } from 'formik';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { FiCheck, FiPlus, FiX } from 'react-icons/fi';
import { months } from '../utils/months.json';
import { uom } from '../utils/uom.json';
import TooltipButton from './tooltipbutton';

const TableForm = (props) => {
    const form = props.form;
    const confirmfunction = (form) => props.confirmfunction(form);
    
    const router = useRouter();
    
    const recordSchema = yup.object().shape({
        record: yup.string().required(),
        value: yup.number().min(0),
        uom: yup.string().required(),
        primary: yup.boolean().required(),
    })
    
    const recordTableSchema = yup.object().shape({
        year: yup.number().required().positive().integer().min(2000).max(3000),
        month: yup.number().required().positive().integer().min(0).max(11),
        records: yup.array().of(recordSchema),
        uid: yup.string()
    })

    const [isSubmitting, setIsSubmitting] = useState(false);

    const goBack = () => {
        router.back();
    }

    const handleSubmit = (form) => {
        setIsSubmitting(true)
        confirmfunction(form);
    }

    return (
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
                <Form style={{paddingTop: 20}} noValidate onSubmit={handleSubmit}>
                    <h5 className="text-dark">New Table</h5>
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
                                as="select"
                                type="number"
                                name="month"
                                placeholder="month"
                                value={values.month}
                                onChange={handleChange}
                                isValid={touched.month && !errors.month}
                                isInvalid={errors.month}
                            >
                                {months.map((month, index) => (
                                    <option key={month} value={index}>{month}</option> 
                                ))}                                    
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.month}</Form.Control.Feedback>                                
                        </Form.Group>
                    </Form.Row>
                    <h5 className="text-dark">Records</h5>
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
                                                {uom.map(uom => (
                                                    <option key={uom}>{uom}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <TooltipButton 
                                                block={true} 
                                                placement="top" 
                                                tooltip="Remove Row" 
                                                icon={<FiX/>} 
                                                function={() => arrayHelpers.remove(index)} 
                                                variant={"outline-dark"}/>
                                        </Form.Group>
                                    </Form.Row>
                                ))
                            )}
                            <Form.Row className="justify-content-end">
                                <Form.Group as={Col} md="2">
                                    <TooltipButton 
                                        block={true} 
                                        placement="left" 
                                        tooltip="Add Row" 
                                        icon={<FiPlus/>} 
                                        function={() => arrayHelpers.push({ record: '', value: '', uom: '', primary: false })} 
                                        variant={"outline-dark"}/>
                                </Form.Group>
                            </Form.Row>
                            </>
                        )}
                    />
                    <ButtonToolbar className="justify-content-center" style={{marginBottom: 50}}>
                        <ButtonGroup size="lg">
                            <TooltipButton 
                                placement="top"
                                tooltip="Save"
                                icon={isSubmitting ? <Spinner as="span" animation="border" /> : <FiCheck/>}
                                type="submit"
                                variant="outline-success"
                            />
                            <TooltipButton 
                                placement="top"
                                tooltip="Cancel"
                                icon={<FiX/>}
                                function={() => router.back()}
                                variant="outline-danger"
                            />                            
                        </ButtonGroup>
                    </ButtonToolbar>
                </Form>
            )}
        </Formik>
    );
}
 
export default TableForm;