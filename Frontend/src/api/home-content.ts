import api from '../utils/api'

export const getHomeContent = async ()=>{
  try {
    const response = await api.get("/api/home-content");

    if (response.status === 200) {
      return response.data.data;
    }

    return;

  } catch (error){
    console.log("Failed to fetch Home Content", error);
    return;

  }
}

export const updateHomeContent = async (payload: any) => {
  try {
    const response = await api.patch(`/api/home-content`, payload);

    if (response.status === 200) {
      console.log("Home Content updated successfully:", response.data);
      return response.data;
    }

    return null;
  } catch (error) {
    console.error("Failed to update Home Content", error);
    return null;
  }
};