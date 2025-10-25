import { useEffect } from "react";
  import CategoryItem from "../components/CategoryItem";
  import { useProductStore } from "../stores/useProductStore";
  import FeaturedProducts from "../components/FeaturedProducts";

  const categories = [
    { href: "/one_piece", name: "One Piece", imageUrl: "/one_piece.jpg" },
    { href: "/naruto", name: "Naruto", imageUrl: "/naruto.jpg" },
    { href: "/pokemon", name: "Pokemon", imageUrl: "/pokemon.jpg" },
    { href: "/genshin_impact", name: "Genshin Impact", imageUrl: "/genshin_impact.jpg" },
    { href: "/kimetsu_no_yaiba", name: "Kimetsu no Yaiba", imageUrl: "/kimetsu_no_yaiba.jpg" },
    { href: "/sword_art_online", name: "Sword Art Online", imageUrl: "/sword_art_online.jpg" },
  ];

  const HomePage = () => {
    const { fetchFeaturedProducts, products, isLoading } = useProductStore();

    useEffect(() => {
      fetchFeaturedProducts();
    }, [fetchFeaturedProducts]);

    return (
      <div className='relative min-h-screen text-white overflow-hidden'>
        <div className='h-24' />
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <h1 className='text-center text-5xl sm:text-6xl font-extrabold text-white mb-2'>
            Explore Our Categories
          </h1>
          <p className='text-center text-xl text-emerald-400 font-semibold tracking-wider mb-20'>
            Discover the new figurine in shop 
          </p>
          
          <div className='h-7' />

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12'>
            {categories.map((category) => (
              <CategoryItem category={category} key={category.name} />
            ))}
          </div>

          <div className='h-16' />

          {!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
        </div>
      </div>
    );
  };
  export default HomePage;