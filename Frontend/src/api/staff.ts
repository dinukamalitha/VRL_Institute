import api from "../utils/api";

// Create a new staff member
export const createStaffMember = async (payload: any) => {
    try {
        const response = await api.post("/api/staff", payload);

        if (response.status === 201) {
            return response.data;
        }

        return [];
    } catch (error) {
        console.log("Failed to create staff member", error);
        return [];
    }
};

// Get all staff members
export const getAllStaffMembers = async () => {
    try {
        const response = await api.get("/api/staff");

        if (response.status === 200) {
            return response.data;
        }

        return [];
    } catch (error) {
        console.log("Failed to fetch staff members", error);
        return [];
    }
};

// Update a staff member by ID
export const updateStaffMemberById = async (id: string, payload: any) => {
    try {
        const response = await api.patch(`/api/staff/${id}`, payload);

        if (response.status === 200) {
            console.log("Staff member updated successfully:", response.data);
            return response.data;
        }

        return null;
    } catch (error) {
        console.error("Failed to update staff member", error);
        return null;
    }
};

// Delete a staff member by ID
export const removeStaffMember = async (id: string) => {
    try {
        const response = await api.delete(`/api/staff/${id}`);

        if (response.status === 200) {
            return response.data;
        }

        return [];
    } catch (error) {
        console.log("Failed to delete staff member", error);
        return [];
    }
};
