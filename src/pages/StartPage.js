import React from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../services/User';
import { createGame } from '../services/MasterGame';
import Button from '../components/Button';

const Start = () => {
  const { user } = useSession();
  return (
    <div style={styles.container}>
      <Link to="/create" onClick={() => createGame(user)}> <Button>Nouvelle partie</Button>
      </Link>
      <br />
      <Link to="/join">
        <Button style={styles.margin}>Rejoindre une partie</Button>
      </Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center'
  },
  margin: {
    marginTop:10,
    marginBottom: 10
  }
}
export default Start;
