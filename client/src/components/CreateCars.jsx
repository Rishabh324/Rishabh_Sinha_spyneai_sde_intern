import { useState } from 'react'
import API from '../services/API';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateCars = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    carTitle: '',
    carDescription: '',
    carModel: '',
    tags: [],
    imgsUrl: [],
    createdBy: ''
  });

  const [tag, setTag] = useState("");

  const handleKeyPress = (e) => {
    if(e.key === "Enter"){
      setFormData({
        ...formData,
        tags: [...formData.tags, tag]
      })
      setTag("");
    }
  }

  const handleImageChange = async (event) => {
    const files = event.target.files;
    const base64Images = await convertFilesToBase64(files);
    setFormData({
      ...formData,
      imgsUrl: [{...formData.imgsUrl, ...base64Images}]
    })
  };

  const convertFilesToBase64 = (files) => {
    return Promise.all([...files].map((file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result); // Base64 string
            reader.onerror = (error) => reject(error);
        });
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      console.log(formData);
      const response = await API.post('/cars/create-car', formData);
      if(response.data.status === "Success") {
        toast.success("Car added successfully");
        navigate('/my-cars');
      }
    } catch(err){
      toast.error("Failed to add car");
      console.log(err);
    }
  }

  return (
    <div>
      <h1 className='text-3xl font-semibold'>Create Your Car</h1>
      <div className='p-4'>
        <div className='flex flex-col'>
          <label htmlFor='carTitle' className='text-lg font-semibold'>Car Title</label>
          <input type='text' id='carTitle' className='border-2 border-gray-300 rounded-lg p-2' onChange={handleInputChange} />
        </div>
        <div className='flex flex-col my-4'>
          <label htmlFor='carDescription' className='text-lg font-semibold'>Car Description</label>
          <input type='text' id='carDescription' className='border-2 border-gray-300 rounded-lg p-2' onChange={handleInputChange} />
        </div>
        <div className='flex flex-col my-4'>
          <label htmlFor='carModel' className='text-lg font-semibold'>Car Model</label>
          <input type='text' id='carModel' className='border-2 border-gray-300 rounded-lg p-2' onChange={handleInputChange} />
        </div>
        <div className='flex flex-col my-4'>
          <label htmlFor='tags' className='text-lg font-semibold'>Car Tags</label>
          <input type='text' id='tags' value={tag} className='border-2 border-gray-300 rounded-lg p-2' onChange={(e)=>setTag(e.target.value)} onKeyDown={(e)=>handleKeyPress(e)} />
          <div className='flex gap-2 mt-2'>
          {
            formData.tags.map((tag, index)=>(
              <p key={index} className='px-2 py-1 cursor-pointer rounded-3xl border-2 border-blue-800 bg-blue-300 text-blue-800' onClick={
                ()=>setFormData({
                  ...formData,
                  tags: formData.tags.filter((t, i)=> i !== index)
                })
              }>{tag}</p>
            ))
          }
          </div>
        </div>
        <div className='flex flex-col my-4'>
          <label htmlFor='imgsUrl' className='text-lg font-semibold'>Car Image</label>
          <input type='file' accept='image/*' multiple id='imgsUrl' className='border-2 border-gray-300 rounded-lg p-2' onChange={handleImageChange} />
        </div>
        <div className='flex justify-center my-4'>
          <button className='bg-blue-400 text-white px-4 py-2 rounded-lg' onClick={handleSubmit}>Create Car</button>
        </div>
      </div>
    </div>
  )
}

export default CreateCars