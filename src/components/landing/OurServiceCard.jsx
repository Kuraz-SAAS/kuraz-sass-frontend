import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";

const GlowingCard = ({data}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // X coordinate within the card
    const y = e.clientY - rect.top; // Y coordinate within the card
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      whileHover={{
        boxShadow: "0px 4px 30px rgba(66, 153, 225, 0.5)",
      }}
      transition={{ duration: 0.3 }}
      className="relative group cursor-pointer"
      onMouseMove={handleMouseMove}
    >
      <Card className="relative overflow-hidden rounded-2xl border border-gray-700 bg-gray-900 p-6 transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl">
        {/* Background glow effect */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(117, 105, 42, 0.3), rgba(194, 190, 168, 0.1), transparent 80%)`,
          }}
        ></div>

        <CardContent className="relative grid gap-7 z-10 text-white">
          <div className="flex justify-between ">
            <h1 className="text-5xl font-bold text-primary">{data?.number}</h1>
            <p className="text-xl font-light">{data.title}</p>
          </div>

          <div className="flex justify-center">
            <img src={data.image} className="w-[15rem]" />
          </div>

          <div className="grid gap-5">
            <p>
              {data?.description}
            </p>
            <ul>
              {data?.resources?.map((resource, index)=>(
                <li key={index}>{resource}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GlowingCard;
