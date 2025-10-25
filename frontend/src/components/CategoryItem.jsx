import { Link } from "react-router-dom";

  const CategoryItem = ({ category }) => {
    return (
      <div className='relative overflow-hidden h-96 w-full rounded-xl group shadow-2xl transform transition-transform duration-500 hover:scale-[1.03] hover:shadow-teal-500/50'>
        <Link to={"/category" + category.href}>
          <div className='w-full h-full cursor-pointer'>
            <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 opacity-90 transition-opacity duration-300 z-10' />
            <img
              src={category.imageUrl}
              alt={category.name}
              className='w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110'
              loading='lazy'
            />
            <div className='absolute bottom-0 left-0 right-0 p-8 z-20 transform transition-transform duration-500 group-hover:-translate-y-3'>
              <h3 className='text-white text-4xl font-extrabold mb-1 drop-shadow-lg'>{category.name}</h3>
              <p className='text-teal-400 text-lg font-semibold drop-shadow-lg'>Explore {category.name}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  export default CategoryItem;