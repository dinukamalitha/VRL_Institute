
import {Request, Response} from "express";
import HomeContent from "../models/HomeContent";

// Get home content
export const getHomeContent = async (req: Request, res: Response) => {
    try {
        let content = await HomeContent.findOne();
        if (!content) {
            content = await HomeContent.create({
                // heroWords: ["Explore", "Learn", "Transform"],
                visionText:
                    "To be Sri Lanka's leading institute for research and learning-advancing innovation, fostering strategic partnerships, and delivering tailored solutions that empower industries and individuals to achieve sustainable success and shape a competitive presence in the global marketplace.",
                purposeText:
                    "VRL Institute is dedicated to advancing knowledge and innovation through national, industry, and organisation-specific research...",
            });
        }
        res.status(200).json({ success: true, data: content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Update home content
export const updateHomeContent = async (req: Request, res: Response) => {
    try {
        const { visionText, purposeText } = req.body;
        let content = await HomeContent.findOne();

        if (!content) {
            content = new HomeContent({ visionText, purposeText });
        } else {
            // content.heroWords = heroWords;
            content.visionText = visionText;
            content.purposeText = purposeText;
        }

        await content.save();
        res.status(200).json({ success: true, data: content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to update content" });
    }
};
