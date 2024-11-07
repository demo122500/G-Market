import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBanner, getAllBanners } from '../../redux/actions/banner';
import { AiOutlineDelete } from 'react-icons/ai';
import Loader from '../Layout/Loader';

const AllBanners = () => {
    const dispatch = useDispatch();
    
    const { banners = [], isLoading = false } = useSelector((state) => state.banners || {});

    useEffect(() => {
      dispatch(getAllBanners());
    }, [dispatch]);

    const handleDelete = (id) => {
      dispatch(deleteBanner(id)).then(() => {
        dispatch(getAllBanners());
      });
    };

    return (
      <div className="bg-white mx-8 pt-1 mt-10 w-full">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b">Banner ID</th>
                <th className="p-4 border-b">Name</th>
                <th className="p-4 border-b">Duration</th>
                <th className="p-4 border-b">License No.</th>
                <th className="p-4 border-b">Preview</th>
                <th className="p-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner) => (
                <tr key={banner._id}>
                  <td className="p-4 border-b">{banner._id}</td>
                  <td className="p-4 border-b">{banner.name}</td>
                  <td className="p-4 border-b">{banner.duration}</td>
                  <td className="p-4 border-b">{banner.license}</td>
                  <td className="p-4 border-b">
                    <img
                      src={banner.imageUrl}
                      alt="Banner Preview"
                      className="w-24 h-24 object-contain rounded"
                    />
                  </td>
                  <td className="p-4 border-b">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => handleDelete(banner._id)}>
                        <AiOutlineDelete size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
};

export default AllBanners;
