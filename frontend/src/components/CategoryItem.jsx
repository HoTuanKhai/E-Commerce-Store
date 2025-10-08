import { Link } from "react-router-dom";

  const CategoryItem = ({ category }) => {
    return (
      <div className='relative overflow-hidden h-96 w-full rounded-lg group shadow-lg transform transition-transform duration-500
  hover:scale-105 hover:shadow-2xl'>
        <Link to={"/category" + category.href}>
          <div className='w-full h-full cursor-pointer'>
            <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70 group-hover:opacity-80
  transition-opacity duration-300 z-10' />
            <img
              src={category.imageUrl}
              alt={category.name}
              className='w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110'
              loading='lazy'
            />
            <div className='absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-500
  group-hover:-translate-y-2'>
              <h3 className='text-white text-3xl font-bold mb-2 drop-shadow-md'>{category.name}</h3>
              <p className='text-gray-200 text-base drop-shadow-md'>Explore {category.name}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  export default CategoryItem;