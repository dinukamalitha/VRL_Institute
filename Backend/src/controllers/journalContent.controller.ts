import { Request, Response } from "express";
import JournalContent from "../models/journalContent";

// Get journal content
export const getJournalContent = async (_req: Request, res: Response) => {
    try {
        let content = await JournalContent.findOne();
        if (!content) {
            // Return default content if none exists
            content = new JournalContent({
                welcomeText: "Welcome to the official Veritas Research & Learning Journal (VRLJ). Explore our multidisciplinary research publications that bridge theory and practice for real-world impact.",
                aimOfJournal: "The Veritas Research & Learning Journal (VRLJ) dedicates itself to fostering high-quality, multidisciplinary research that connects theory and practice. The journal aims to disseminate impactful knowledge that fosters innovation, informs policy, and contributes to real-world problem-solving across diverse academic and professional domains.",
                peerReviewProcess: "Upon submission, one of the editors will conduct a preliminary review to assess the manuscript's relevance, quality, and compliance with journal guidelines. If deemed suitable, the manuscript will then undergo a double-blind peer review process by two independent reviewers, ensuring objectivity and academic rigor.",
                publicationPolicy: "VRLJ is a digital-only journal. Accepted articles will be published online within two weeks of the final manuscript submission. A compiled electronic book version of the journal will be released semiannually (two volumes per year) and will be available for download. Printed versions can be obtained by interested parties. A nominal publication fee is charged to cover administrative costs.",
                openAccessPolicy: "This journal provides immediate and free open access to all its content, based on the principle that freely available research promotes a greater global exchange of knowledge and supports academic development.",
                publisher: "Veritas Research & Learning Institute",
                chiefEditors: [
                    "Dr. Susil Kumara Silva",
                    "Dr. Jayantha Balasooriya",
                    "Dr. Mihira Wanninayake"
                ],
                submissionEmail: "info@vrlinstitute.lk",
                submissionText: "We welcome submissions from researchers and scholars across diverse disciplines.",
                typographicGuidance: "Body text: Times New Roman, 11pt minimum, normal style. Headings: Times New Roman, 11pt minimum, bold style. Page setup: 2.54 cm margins on all sides, single line spacing.",
                maxWordCount: "8,000 words (excluding references, appendices, tables, title, and abstract). Abstract ≤ 400 words.",
                referencingProfessionalism: "Identify and acknowledge all sources, use consistent referencing style (Harvard or APA), maintain high-quality English. Diagrams, tables, and figures should be included in the main text; large tables may go in appendices."
            });
            await content.save();
        }
        res.status(200).json({ success: true, data: content });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch journal content" });
    }
};

// Update journal content
export const updateJournalContent = async (req: Request, res: Response) => {
    try {
        const {
            welcomeText,
            aimOfJournal,
            peerReviewProcess,
            publicationPolicy,
            openAccessPolicy,
            publisher,
            chiefEditors,
            submissionEmail,
            submissionText,
            typographicGuidance,
            maxWordCount,
            referencingProfessionalism,
            imageUrl,
        } = req.body;

        let content = await JournalContent.findOne();

        if (!content) {
            content = new JournalContent({
                welcomeText,
                aimOfJournal,
                peerReviewProcess,
                publicationPolicy,
                openAccessPolicy,
                publisher,
                chiefEditors,
                submissionEmail,
                submissionText,
                typographicGuidance,
                maxWordCount,
                referencingProfessionalism,
                imageUrl,
            });
        } else {
            content.welcomeText = welcomeText;
            content.aimOfJournal = aimOfJournal;
            content.peerReviewProcess = peerReviewProcess;
            content.publicationPolicy = publicationPolicy;
            content.openAccessPolicy = openAccessPolicy;
            content.publisher = publisher;
            content.chiefEditors = chiefEditors;
            content.submissionEmail = submissionEmail;
            content.submissionText = submissionText;
            content.typographicGuidance = typographicGuidance;
            content.maxWordCount = maxWordCount;
            content.referencingProfessionalism = referencingProfessionalism;
            if (imageUrl !== undefined) {
                content.imageUrl = imageUrl;
            }
        }

        await content.save();
        res.status(200).json({ success: true, data: content });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to update journal content" });
    }
};

