import mongoose, { mongo } from 'mongoose';

const RecordSchema = new mongoose.Schema({
    record: { type: String, required: true},
    value: { type: Number, required: true },
    uom: { type: String, required: true, enum: ['kg', 'm', 'rep', 'sec'] },
    primary: { type: Boolean, required: true }
})

const Record = mongoose.models.Record || mongoose.model('Record', RecordSchema);

const RecordTableSchema = new mongoose.Schema({
    year: { type: Number, required: true, maxlength: 4 },
    month: { type: Number, required: true, maxlength: 2 },
    records: [RecordSchema],
    userid: { type: String, required: true }
})

export default mongoose.models.RecordTable || mongoose.model('RecordTable', RecordTableSchema)
