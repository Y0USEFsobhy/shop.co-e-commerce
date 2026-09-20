import axios from "axios";
export async function productLoader(id) {

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}${id}/?user_field_names=true`,
      {
        headers: {
          Authorization: import.meta.env.VITE_API_Authorization,
          "Content-Type": "application/json",
        }
        },
    );
    if (!response.data) throw new Error("Product not found");
    return response.data;
  } catch (error) {
    throw new Response(`Product Not Found ${error}`, { status: 404 });
  }
}

