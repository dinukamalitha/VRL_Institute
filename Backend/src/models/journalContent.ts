import mongoose from "mongoose";

const JournalContentSchema = new mongoose.Schema({
    welcomeText: {
        type: String,
        required: true,
    },
    aimOfJournal: {
        type: String,
        required: true,
    },
    peerReviewProcess: {
        type: String,
        required: true,
    },
    publicationPolicy: {
        type: String,
        required: true,
    },
    openAccessPolicy: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    chiefEditors: {
        type: [String],
        required: true,
    },
    submissionEmail: {
        type: String,
        required: true,
    },
    submissionText: {
        type: String,
        required: true,
    },
    typographicGuidance: {
        type: String,
        required: true,
    },
    maxWordCount: {
        type: String,
        required: true,
    },
    referencingProfessionalism: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
});

export default mongoose.model("JournalContent", JournalContentSchema);

