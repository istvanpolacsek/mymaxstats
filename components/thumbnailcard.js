import Card from "react-bootstrap/Card";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import TooltipButton from '../components/tooltipbutton';
import DeleteButton from '../components/deletebutton.js';
import { months } from '../utils/months.json';
import { FiEdit2, FiEye } from 'react-icons/fi';

const ThumbnailCard = (props) => {
    const recordTable = props.recordTable;

    const sformat = new Intl.NumberFormat('en-US', {minimumFractionDigits: 2});

    return (
        <Card bg="light" key={recordTable._id} style={{ marginTop: 15 }}>
            <Card.Body>
                <Card.Title as="a" href={`/${recordTable._id}`} className="h5 text-dark">{recordTable.year} {months[recordTable.month]}</Card.Title>
            </Card.Body>
            <ListGroup variant="flush">
                {recordTable.records.map(record => (
                    <ListGroupItem variant="light" className="d-flex justify-content-between" key={record._id}>
                        <div>{record.record}</div>
                        <div>{record.uom == 'm:s' ? sformat.format(record.value) : record.value}</div>
                    </ListGroupItem>
                ))}
            </ListGroup>
            <Card.Body>
                <ButtonToolbar className="justify-content-center">
                    <ButtonGroup size="lg">
                        <TooltipButton placement="top" tooltip="View" icon={<FiEye/>} href={`/${recordTable._id}`} variant={"outline-dark"}/>
                        <TooltipButton placement="top" tooltip="Edit" icon={<FiEdit2/>} href={`/${recordTable._id}/edit`} variant={"outline-dark"}/>
                        <DeleteButton tableid={recordTable._id} />
                    </ButtonGroup>
                </ButtonToolbar>
            </Card.Body>            
        </Card>
    );
}

export default ThumbnailCard;