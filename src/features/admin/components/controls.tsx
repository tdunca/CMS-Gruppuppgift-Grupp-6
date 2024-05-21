import { useNavigate } from 'react-router-dom';
import { auth } from '../../../main';

function Controls() {
  const navigate = useNavigate();

  const signOutUser = async () => {
    try {
      await auth.signOut();
      console.log('signed out');
      navigate('/admin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <footer>
      <p>CONTROLS FÖR FAN!</p>
      {auth.currentUser && <button onClick={signOutUser}>Sign Out</button>}
    </footer>
  );
}

export default Controls;
