import { useState } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import TableForm from '../../components/tableform.js';
import BackArrow from '../../components/backarrow.js'
import DeleteButton from '../../components/deletebutton.js';

const appurl = process.env.NEXT_PUBLIC_URL;

const EditTable = ({ recordTable }) => {

    const router = useRouter();

    const [form, setForm] = useState({ 
        year: recordTable.year, 
        month: recordTable.month,
        records: recordTable.records,
        userid: recordTable.userid
    });
    
    const updateRecordTable = async (form) => {
        try {
            const res = await fetch(`/api/recordtables/${router.query.id}`, {
                method: 'PUT',
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

    return (
        <Container style={{ paddingTop: 80 }}>
            <ButtonToolbar className="justify-content-between">
                <BackArrow/>
                <ButtonGroup size="lg">
                    <DeleteButton tableid={router.query.id}/>             
                </ButtonGroup>
            </ButtonToolbar>
            <TableForm form={form} confirmfunction={updateRecordTable}/>
        </Container>
    )
}

EditTable.getInitialProps = async ({ query: { id }}) => {

    const res = await fetch(`${appurl}/api/recordtables/${id}`);
    const { data } = await res.json();

    return { recordTable: data }
}

export default EditTable