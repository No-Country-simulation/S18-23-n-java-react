import axios from "axios"

const cloudinaryService = {
  async uploadImages(images: File[]): Promise<string[]> {
    const imageUrls: string[] = []

    for (const image of images) {
      const data = new FormData()
      data.append("file", image)
      data.append(
        "upload_preset",
        'rp8iy6uf'
      )
      data.append("cloud_name", 'dabgkc4zi')
      data.append("folder", "Cloudinary-React")

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dabgkc4zi/image/upload`,
          data
        )
        imageUrls.push(response.data.secure_url)
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    return imageUrls;
  },
};

export default cloudinaryService;
