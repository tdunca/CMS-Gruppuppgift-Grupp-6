import Style from './realtor-card-component.module.css';

interface Props {
  name: string;
  email: string;
  phoneNumber: string;
  imageUrl?: string;
}

export const RealtorCard = ({ name, email, phoneNumber, imageUrl }: Props) => {
  return (
    <div className={Style.card}>
      <img className={Style.image} src={imageUrl} />
      <p className={Style.name}>{name}</p>
      <p className={Style.email}>{email}</p>
      <p className={Style.phoneNumber}>{phoneNumber}</p>
    </div>
  );
};
