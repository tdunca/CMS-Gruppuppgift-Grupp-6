import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { type Home, fetchHomeById } from '../../shared/firebase/home';
import { type AgentData } from '../../shared/firebase/user';
import '../views/details.css';

function Details() {
  const [home, setHome] = useState<Home>();
  const [agent, setAgent] = useState<AgentData>();
  const { id } = useParams();

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
    <main>
      <section>
        <h1>{home.homeAddress}</h1>
        <img
          className="coverImg"
          src={home.coverImage}
          alt="Ett av våra hus för fan!"
        />
        <p>{home.description}</p>
        <h2>
          {home.homeCity}, {home.postalCode}
        </h2>
        <h2>Utgångspris: {home.homePrice}</h2>
        <h3>Detaljer:</h3>
        <p>Antal rum: {home.roomNum}</p>
        <p>Kvadratmeter: {home.landSquareMeters}</p>
        <p>Energiklass: {home.homeEnergyClass}</p>
        <p>Byggår: {home.homeBuildYear}</p>
        <p>Tomtarea: {home.landSquareMeters}</p>
      </section>
      <section>
        <p>{home.description}</p>
        <h3>Kontaktuppgifter till mäklare:</h3>
        <p>{agent.name}</p>
        <p>{agent.phoneNum}</p>
        <p>{agent.workEmail}</p>
      </section>
    </main>
  );
}

export default Details;
