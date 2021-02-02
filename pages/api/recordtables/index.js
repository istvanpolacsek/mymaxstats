import dbConnect from '../../../utils/db.js';
import RecordTable from '../../../models/RecordTable.js';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const recordTables = await RecordTable.find({});

                res.status(200).json({ success: true, data: recordTables });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const recordTable = await RecordTable.create(req.body);

                res.status(201).json({ success: true, data: recordTable })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}