import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { type Home, fetchHomeById } from '../../shared/firebase/home';
import { type AgentData } from '../../shared/firebase/user';
import '../views/details.css';

function Details() {
  const [home, setHome] = useState<Home>();
  const [agent, setAgent] = useState<AgentData>();
  const { id } = useParams();
  const sekConverter = new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
  });

  console.log(sekConverter.format(12314532325));

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
        <h3>Detaljer:</h3>
        <p>Beskrivning: {home.description}</p>
        <p className="price">
          Utgångspris: {sekConverter.format(home.homePrice)}
        </p>
        <p>Ort: {home.homeCity}</p>
        <p>Postnummer: {home.postalCode}</p>
        <p>Antal rum: {home.roomNum}</p>
        <p>Kvadratmeter: {home.landSquareMeters}</p>
        <p>Energiklass: {home.homeEnergyClass}</p>
        <p>Byggår: {home.homeBuildYear}</p>
        <p>Tomtarea: {home.landSquareMeters}</p>
      </section>
    </main>
  );
}

export default Details;
