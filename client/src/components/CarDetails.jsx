import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import API from '../services/API';

const CarDetails = () => {
    const [carData, setCarData] = useState({});
    const { id } = useParams();
    
    const getData = async () => {
        try {
            const response = await API.get(`/cars/my-cars/${id}`);
            setCarData(response.data.data);
            console.log(response.data.data);
        } catch (err) {
            console.log(err);
        };
    }
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='p-4'>
            <div>
                <h1 className='text-3xl font-semibold'>Car Details</h1>
            </div>
            <div className='p-4 border-2 border-blue-700 rounded-3xl'>
                <div className='flex justify-between text-2xl'>
                    <h1 className='font-semibold'>Title: {carData?.carTitle}</h1>
                    <h1 className='font-semibold'>Car Model: {carData?.carModel}</h1>
                </div>
                <div>
                    <p className='text-xl font-semibold mt-3'>Images:</p>
                    <div className='flex gap-3 overflow-x-scroll'>
                    {
                        carData?.imgsUrl?.map((img, index) => (
                            <img key={index} src={img} alt='car' className='rounded-lg h-48 w-48 object-cover'/>
                        ))
                    }
                    </div>
                </div>
                <div className='flex gap-2 mt-3'>
                    <p className=' text-xl font-semibold'>Car Description: </p>
                    <p className='text-xl'>{carData?.carDescription}</p>
                </div>
                <div className='flex gap-2 mt-3'>
                    <p className='text-xl font-semibold'>Tags:</p>
                    <div className='flex'>
                    {
                        carData.tags?.map((tag, index)=>(
                            <p key={index} className='px-2 py-1 rounded-3xl border-2 border-blue-800 bg-blue-300 text-blue-800'>{tag}</p>
                        )
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarDetails;