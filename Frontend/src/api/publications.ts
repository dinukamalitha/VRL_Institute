import api from "../app/utils/api";
import {Publication} from "@/types/publications";

// Create a new publication
export const createPublication = async (payload: Publication) => {
    try {
        const response = await api.post("/api/publications", payload);

        if (response.status === 201) {
            return response.data;
        }

        return null;
    } catch (error) {
        console.error("Failed to create publication", error);
        return null;
    }
};

// Get all publications
export const getAllPublications = async () => {
    try {
        const response = await api.get("/api/publications");

        if (response.status === 200) {
            return response.data;
        }

        return [];
    } catch (error) {
        console.error("Failed to fetch publications", error);
        return [];
    }
};

// Get publications count by category
export const getPublicationCountsByCategory = async () => {
    try {
        const response = await api.get("/api/publications/countsByCategory");

        if (response.status === 200) {
            return response.data;
        }

        return {};
    } catch (error) {
        console.error("Failed to fetch publications", error);
        return {};
    }
};

// Get a publication by ID
export const getPublicationById = async (id: string) => {
    try {
        const response = await api.get(`/api/publications/${id}`);

        if (response.status === 200) {
            return response.data;
        }

        return null;
    } catch (error) {
        console.error("Failed to fetch publication", error);
        return null;
    }
};

// Update a publication by ID
export const updatePublicationById = async (id: string, payload: any) => {
    try {
        const response = await api.put(`/api/publications/${id}`, payload);

        if (response.status === 200) {
            console.log("Publication updated successfully:", response.data);
            return response.data;
        }

        return null;
    } catch (error) {
        console.error("Failed to update publication", error);
        return null;
    }
};

// Delete a publication by ID
export const removePublication = async (id: string) => {
    try {
        const response = await api.delete(`/api/publications/${id}`);

        if (response.status === 200) {
            return response.data;
        }

        return null;
    } catch (error) {
        console.error("Failed to delete publication", error);
        return null;
    }
};
