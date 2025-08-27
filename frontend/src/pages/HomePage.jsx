import CategoryItem from "../components/CategoryItem";

const categories = [
	{ href: "/one_piece", name: "One Piece", imageUrl: "/one_piece.jpg" },
	{ href: "/naruto", name: "Naruto", imageUrl: "/naruto.jpg" },
	{ href: "/pokemon", name: "Pokemon", imageUrl: "/pokemon.jpg" },
	{ href: "/genshin_impact", name: "Genshin Impact", imageUrl: "/genshin_impact.jpg" },
	{ href: "/kimetsu_no_yaiba", name: "Kimetsu no Yaiba", imageUrl: "/kimetsu_no_yaiba.jpg" },
	{ href: "/sword_art_online", name: "Sword Art Online", imageUrl: "/sword_art_online.jpg" },
];

const HomePage = () => {
    return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
					Explore Our Categories
				</h1>
				<p className='text-center text-xl text-gray-300 mb-12'>
					Discover the latest figures
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

			</div>
		</div>
	);
};
export default HomePage;