"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Photo = {
    id: number;
    title: string;
    image: string;
    className?: string;
};

const spring = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    mass: 0.8,
};

const gridItemVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.96,
    },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 20,
        },
    },
};

export default function PhotographyGrid({ photos }: { photos: Photo[] }) {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

    return (
        <>
            {/* Grid */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px] grid-flow-dense"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                    show: {
                        transition: {
                            staggerChildren: 0.08,
                            delayChildren: 0.1,
                        },
                    },
                }}
            >
                {photos.map((photo) => (
                    <motion.div
                        key={photo.id}
                        layout
                        layoutId={`photo-${photo.id}`}
                        transition={spring}
                        variants={gridItemVariants}
                        onClick={() => setSelectedPhoto(photo)}
                        className={`relative group cursor-pointer overflow-hidden rounded-xl bg-zinc-900 will-change-transform ${photo.className || "col-span-1 row-span-1"
                            }`}
                    >
                        <img
                            src={photo.image}
                            alt={photo.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110"
                        />

                        <div className="absolute inset-0 flex items-end bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-4">
                            <h3 className="text-white text-lg font-medium transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                                {photo.title}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        onClick={() => setSelectedPhoto(null)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                            onClick={() => setSelectedPhoto(null)}
                        >
                            <X size={24} />
                        </button>

                        <motion.div
                            layout
                            layoutId={`photo-${selectedPhoto.id}`}
                            transition={spring}
                            className="relative flex w-full max-w-7xl max-h-full flex-col items-center justify-center rounded-lg overflow-hidden p-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.img
                                layout
                                transition={spring}
                                src={selectedPhoto.image}
                                alt={selectedPhoto.title}
                                className="max-h-[85vh] md:max-h-[90vh] w-auto max-w-full object-contain rounded shadow-2xl"
                            />

                            <motion.h3
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 18,
                                    delay: 0.15,
                                }}
                                className="absolute bottom-1.5 w-full rounded bg-black/50 p-2 text-center text-xl md:text-2xl font-semibold text-white backdrop-blur-sm"
                            >
                                {selectedPhoto.title}
                            </motion.h3>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
