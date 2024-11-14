import { useEffect, useState } from 'react'
import API from '../services/API';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { useSelector } from 'react-redux';

const MyCars = () => {
  // const {user} = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const getCarList = async () => {
    try{
      const response = await API.get('/cars/my-cars', 
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
      setTableData(response.data.data);
    } catch(err){
        console.log(err);
    }
  };

  useEffect(() => {
    getCarList();
  }, []);

  const handleDelete = async (id) => {
    try{
      const response = await API.delete(`/cars/delete-car/${id}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        }
      );
      if(response.status === 200){
        toast.success('Car deleted successfully');
        getCarList();
      }
    } catch(err){
      console.log(err);
    }
  };

  const handleSearch = async () => {
    try{
      if(searchText===""){
        getCarList();
      } else {
        const response = await API.get(`/cars/search/${searchText}`, 
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
          }
        );
        setTableData(response.data.data);
      }
    } catch(err){
      console.log(err);
    }
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-semibold'>My heaven of Cars</h1>
        <div className='flex gap-2 '>
          <input placeholder='Search' className='border-2 border-gray-200 px-4 py-2 rounded-lg' value={searchText} onChange={(e)=>setSearchText(e.target.value)} />
          <button className='px-4 py-2 rounded-lg bg-blue-400 text-white' onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-3'>
        {tableData?.map((car, index) => (
          <div key={index} className='flex flex-col cursor-pointer justify-between border rounded-lg border-gray-300 p-4 my-4'>
            <div onClick={()=>navigate(`/my-cars/${car._id}`)}>
              <img src={car.imgsUrl[0]} alt='car' className='rounded-lg h-48 w-full object-cover'/>
              <div className='flex justify-between mt-2'>
                <h1 className='text-xl font-semibold'>{car.carTitle}</h1>
                <p className='text-lg font-semibold'>{car.carModel}</p>
              </div>
              <div className='flex flex-wrap gap-2 mt-2'>
                {car.tags?.map((tag, index)=>(
                  index<=5 && <p key={index} className='px-2 py-1 rounded-3xl border-2 border-blue-800 bg-blue-300 text-blue-800'>{tag}</p>
                ))}
              </div>
            </div>
            <div className='flex gap-2 mt-3'>
              <button className='px-6 py-2 bg-blue-200 text-blue-800 border-2 border-blue-800 rounded-3xl' onClick={()=>{
                navigate(`/my-cars/edit/${car._id}`, {
                  state: car,
                })
              }}>
                Edit
              </button>
              <button className='px-6 py-2 bg-red-500 border-2 border-black rounded-3xl' onClick={()=>handleDelete(car._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyCars