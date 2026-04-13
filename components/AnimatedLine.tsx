const AnimatedLine = ({ className }: { className?: string }) => {
    return (
        <div className={"relative mt-2 " + className}>
            <div className="absolute w-full h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-800/0 via-zinc-800 to-zinc-800/0 mt-16" />
            <div className="absolute w-full h-px animate-glow md:block animate-fade-in bg-gradient-to-r from-zinc-800/0 via-zinc-800 to-zinc-800/0 mt-16" />
        </div>
    );
};


export default AnimatedLine;