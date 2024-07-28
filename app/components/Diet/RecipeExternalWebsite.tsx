
export default function RecipeExternalWebsite(props: { website: string }) {
    return (
        <>
            <div className="glass-card p-2 flex gap-2 items-center justify-center align-middle md:scale-75 xl:scale-100">
                <span className="text-slate-50 text-2xl font-semibold text-center">Browse the detailed recipe</span>
                <a href={props.website} target="_blank" rel="noopener noreferrer">
                    <button className="bg-white text-slate-900 py-1 mx-auto px-2 font-bold rounded-lg hover:bg-opacity-50 transition duration-300">
                        View Recipe
                    </button>
                </a>
            </div>
        </>
    );
}
