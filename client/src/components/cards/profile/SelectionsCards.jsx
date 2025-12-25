import React, { useState } from 'react';
import { colors } from '../../../utils/Colors.js';
import { motion } from 'framer-motion';

function SelectionsCards({ image, title, description }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className={` md:mt-12 w-full md:w-60 lg:w-72 h-52 px-3 py-3 mx-3 my-4 inline-block rounded-2xl transition duration-300`}
            style={{
                backgroundColor: isHovered ? 'rgba(31, 41, 55, 1)' : colors.componentBackground
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                delay: 0.2,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], 
            }}
            
            style={{overflow:'hidden'}}
                className="flex flex-col items-center justify-center h-full">
                <img src={image} alt={title} className="w-16 h-16 mb-4" />
                <h3 className="font-light text-xl mb-2 text-center text-white">{title}</h3>
                <p className="text-gray-500 text-sm text-center">{description}</p>
            </motion.div>
        </motion.div>
    );
}

export { SelectionsCards };
