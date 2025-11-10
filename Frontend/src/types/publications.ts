import {Author} from "@/types/author";

export interface Publication {
    _id: string;
    title: string;
    documentUrl: string;
    category: string;
    authors: Author[];
    thumbnail?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface PublicationDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: Publication) => void;
}
