import api from "../app/utils/api";

export const createNewsBlog = async (payload: any) => {
  try {
    const response = await api.post("/api/news-blogs",payload);

    if (response.status === 201) {
      return response.data;
    }

    return [];

  } catch (error){
    console.log("Failed to create news blog", error);
    return [];

  }
}

export const getAllNewsBlogs = async ()=>{
  try {
    const response = await api.get("/api/news-blogs");

    if (response.status === 200) {
      return response.data;
    }

    return [];

  } catch (error){
    console.log("Failed to fetch data", error);
    return [];

  }
}

export const getNewsBlogsCategories = async ()=>{
  try {
    const response = await api.get("/api/news-blogs/news-blog-categories");

    if (response.status === 200) {
      return response.data;
    }

    return [];

  } catch (error){
    console.log("Failed to fetch data", error);
    return [];

  }
}

export const getNewsBlogsById = async (id: string)=>{
  try {
    const response = await api.get(`/api/news-blogs/${id}`);

    if (response.status === 200) {
      console.log('Data fetched successfully:', response.data)
      return response.data;
    }

    return [];

  } catch (error){
    console.log("Failed to fetch data", error);
    return [];

  }
}

export const updateNewsBlogById = async (id: string, payload: any) => {
  try {
    const response = await api.patch(`/api/news-blogs/${id}`, payload);

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

export const removeNewsBlog = async (id: string) => {
  try {
    const response = await api.delete(`/api/news-blogs/${id}`)

    if (response.status === 200) {
      console.log('Data deletion Successful:', response.data)
      return response.data
    }

    return []
  } catch (error) {
    console.log('Failed to delete data', error)
    return []
  }
}