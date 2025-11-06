import api from "../utils/api";

// Create a new resource person
export const createResourcePerson = async (payload: any) => {
  try {
    const response = await api.post("/api/resource-persons", payload);

    if (response.status === 201) {
      return response.data;
    }

    return [];
  } catch (error) {
    console.log("Failed to create resource person", error);
    return [];
  }
};

// Get all resource persons
export const getAllResourcePersons = async () => {
  try {
    const response = await api.get("/api/resource-persons");

    if (response.status === 200) {
      return response.data;
    }

    return [];
  } catch (error) {
    console.log("Failed to fetch resource persons", error);
    return [];
  }
};

// Update a resource person by ID
export const updateResourcePersonById = async (id: string, payload: any) => {
  try {
    const response = await api.patch(`/api/resource-persons/${id}`, payload);

    if (response.status === 200) {
      console.log("Resource person updated successfully:", response.data);
      return response.data;
    }

    return null;
  } catch (error) {
    console.error("Failed to update resource person", error);
    return null;
  }
};

// Delete a resource person by ID
export const removeResourcePerson = async (id: string) => {
  try {
    const response = await api.delete(`/api/resource-persons/${id}`);

    if (response.status === 200) {
      return response.data;
    }

    return [];
  } catch (error) {
    console.log("Failed to delete resource person", error);
    return [];
  }
};
