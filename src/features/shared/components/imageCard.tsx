// src/features/admin/components/ImageCard.tsx
import React from 'react';
import './imageCard.css';

type ImageCardProps = {
  imageUrl: string;
  title: string;
  description: string;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
  onClick?: () => void;
};

const ImageCard: React.FC<ImageCardProps> = ({
  imageUrl,
  title,
  description,
  onEdit,
  onDelete,
  className = '',
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div className={`image-card ${className}`} onClick={handleClick}>
      <img src={imageUrl} alt="Home" />
      <div className="image-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="image-card-actions">
          {onEdit && <button onClick={onEdit}>Edit</button>}
          {onDelete && (
            <button className="delete" onClick={onDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
