import { useSession } from 'next-auth/client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import Container from 'react-bootstrap/Container';
import { primaries } from '../utils/primaries.json';
import TableForm from '../components/tableform.js';
import HeadMessage from '../components/headmessage';
import TooltipButton from '../components/tooltipbutton';
import { FiArrowLeft } from 'react-icons/fi';

const appurl = process.env.NEXT_PUBLIC_URL;

const NewTable = () => {
    const [session] = useSession();
    const date = new Date();
    const router = useRouter();

    const [form, setForm] = useState({ 
        year: date.getFullYear(), 
        month: date.getMonth(),
        records: [],
        userid: null
    });
    
    if (session && form.records.length < 5) {
        form.userid = session.user.id;
        primaries.forEach(primary => form.records.push({
            record: primary,
            value: 0,
            uom: 'kg',
            primary: true
        }))   
    }

    const createRecordTable = async (form) => {
        try {
            const res = await fetch(`${appurl}/api/recordtables/`, {
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

    return (
        <>
            <HeadMessage message={'New Table'} />
            <Container style={{ paddingTop: 80 }}>
                {session && (<>
                    <TooltipButton placement="right" tooltip="Back" icon={<FiArrowLeft/>} function={() => {router.back()}} variant={"outline-dark"}/>
                    <TableForm form={form} confirmfunction={createRecordTable}/>
                </>)}
            </Container>
        </>
    )
}

export default NewTable