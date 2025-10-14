import mongoose from "mongoose";

const HomeContentSchema = new mongoose.Schema({
    // heroWords: {
    //     type: [String],
    //     default: ["Explore", "Learn", "Transform"],
    // },
    visionText: {
        type: String,
        required: true,
    },
    purposeText: {
        type: String,
        required: true,
    },
});

export default mongoose.model("HomeContent", HomeContentSchema);
