import { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useParams } from 'react-router-dom';
import { fetchHomeById, type Home } from '../../shared/firebase/home';
import { type AgentData } from '../../shared/firebase/user';
import '../views/details.css';
import { RealtorCard } from '../components/realtor-card-component';
import agneta from '../assets/agneta.jpg';

function Details() {
  const [home, setHome] = useState<Home>();
  const [agent, setAgent] = useState<AgentData>();
  const { id } = useParams();
  const sekConverter = new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
  });

  useEffect(() => {
    const onLoad = async () => {
      if (!id) return;
      const res = await fetchHomeById(id);

      if (!res) return;
      setHome(res.homeData);
      setAgent(res.agentData);
    };
    onLoad();
  }, [id]);

  // if home is fetching
  if (!home || !agent) {
    return <main>Loading home...</main>;
  }

  // if home fetching is successful
  return (
    <main className="mainPage">
      <section className="houseSection">
        <h1>
          {home.homeAddress}, {home.homeCity}
        </h1>
        <img className="coverImg" src={home.coverImage} alt="Bild på hus" />
        <div className="houseInfo">
          <h2>Detaljer:</h2>
          <p>Beskrivning: {home.description}</p>
          <p className="price">
            Utgångspris: {sekConverter.format(home.homePrice)}
          </p>
          <p>Ort: {home.homeCity}</p>
          <p>Postnummer: {home.postalCode}</p>
          <p>Antal rum: {home.roomNum}</p>
          <p>Kvadratmeter: {home.landSquareMeters} m²</p>
          <p>Energiklass: {home.homeEnergyClass}</p>
          <p>Byggår: {home.homeBuildYear}</p>
          <p>Tomtarea: {home.landSquareMeters} m²</p>
        </div>
      </section>
      {home.imageUrls.length > 0 && (
        <section className="imageSection">
          <Carousel
            className="detailsCarousel"
            autoPlay={true}
            interval={6000}
            navButtonsAlwaysVisible={true}
            animation="fade"
            stopAutoPlayOnHover={true}
            cycleNavigation={true}
            changeOnFirstRender={true}
          >
            {home.imageUrls.map((url, i) => (
              <img
                key={i}
                src={url}
                className="detailsImage"
                alt="Extra bild på hemmet"
              />
            ))}
          </Carousel>
        </section>
      )}
      <section className="realtorSection">
        <RealtorCard
          imageUrl={agneta}
          name={agent.name}
          phoneNumber={agent.phoneNum + ''}
          email={agent.workEmail}
        />
      </section>
    </main>
  );
}

export default Details;
