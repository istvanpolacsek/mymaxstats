import dbConnect from '../../../utils/db.js';
import RecordTable from '../../../models/RecordTable.js';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;
 
    switch (method) {
        case 'GET':
            try {
                const recordTable = await RecordTable.findById(id);

                if (!recordTable) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: recordTable });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const recordTable = await RecordTable.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!recordTable) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: recordTable });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedRecordTable = await RecordTable.deleteOne({ _id: id });

                if (!deletedRecordTable) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}    