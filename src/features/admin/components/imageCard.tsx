import React from 'react';
import './imageCard.css';

type ImageCardProps = {
  imageUrl: string;
  title: string;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
};

const ImageCard: React.FC<ImageCardProps> = ({
  imageUrl,
  title,
  description,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="image-card">
      <img src={imageUrl} alt="Home" />
      <div className="image-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="image-card-actions">
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
