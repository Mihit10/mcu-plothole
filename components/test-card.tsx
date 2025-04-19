import React from "react";

type CardProps = {
  title: string;
  description?: string;
  imageUrl?: string;
};

const Card = ({ title, description, imageUrl }: CardProps) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-xl">{title}</span>
        </div>
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        {description && <p className="text-gray-700 text-base">{description}</p>}
      </div>
    </div>
  );
};

const CardGrid = () => {
  const cardData = [
    {
      title: "Harry Potter",
      description: "The magical world of wizards and witchcraft",
      imageUrl: "/api/placeholder/400/300"
    },
    {
      title: "Marvel",
      description: "Superheroes saving the universe",
      imageUrl: "/api/placeholder/400/300"
    },
    {
      title: "Game of Thrones",
      description: "Epic fantasy with dragons and political intrigue",
      imageUrl: "/api/placeholder/400/300"
    }
  ];

  return (
    <div className="flex flex-wrap justify-center">
      {cardData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          imageUrl={card.imageUrl}
        />
      ))}
    </div>
  );
};

export default CardGrid;