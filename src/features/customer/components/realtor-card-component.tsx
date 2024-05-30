import Style from './realtor-card-component.module.css';

interface Props {
  name: string;
  email: string;
  phoneNumber: string;
  imageUrl?: string;
}

export const RealtorCard = ({ name, email, phoneNumber, imageUrl }: Props) => {
  return (
    <article className={Style.card}>
      <img className={Style.image} src={imageUrl} />
      <h3 className={Style.name}>{name}</h3>
      <p className={Style.email}>{email}</p>
      <p className={Style.phoneNumber}>{phoneNumber}</p>
    </article>
  );
};
