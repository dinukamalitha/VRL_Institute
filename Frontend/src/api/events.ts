import api from "../app/utils/api";

export const createEvent = async (payload: any) => {
  try {
    const response = await api.post("/api/events",payload);

    if (response.status === 201) {
      return response.data;
    }

    return [];

  } catch (error){
    console.log("Failed to create event", error);
    return [];

  }
}

export const getAllEvents = async ()=>{
  try {
    const response = await api.get("/api/events");

    if (response.status === 200) {
      return response.data;
    }

    return [];

  } catch (error){
    console.log("Failed to fetch data", error);
    return [];

  }
}

export const updateEventById = async (id: string, payload: any) => {
  try {
    const response = await api.patch(`/api/events/${id}`, payload);

    if (response.status === 200) {
      console.log("Blog updated successfully:", response.data);
      return response.data;
    }

    return null;
  } catch (error) {
    console.error("Failed to update blog", error);
    return null;
  }
};

export const removeEvent = async (id: string) => {
  try {
    const response = await api.delete(`/api/events/${id}`)

    if (response.status === 200) {
      return response.data
    }

    return []
  } catch (error) {
    console.log('Failed to delete data', error)
    return []
  }
}