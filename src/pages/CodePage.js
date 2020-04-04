import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useUser} from '../services/User';
import Button from '../components/Button';
import firebase from '../services/Firebase';
import Input from '../components/Input';

const CodePage = ({setGame}) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const {user} = useUser();
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    firebase
      .firestore()
      .collection('game')
      .where('code', '==', parseInt(code))
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const newData = {...doc.data()};
          newData.players = [...newData.players, {uid: user.uid, name}];
          firebase
            .firestore()
            .collection('game')
            .doc(doc.id)
            .update(newData);

          firebase
            .firestore()
            .collection('user')
            .doc(user.uid)
            .update({gameId: doc.id});

          history.push('/wait');
        });
      })
    .catch(console.log);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.container}>
      <Input
        type="text"
        name="code"
        placeholder="Ajouter le code de la partie"
        onChange={e => setCode(e.target.value)}
      /><br/>
      <Input
        type="text"
        name="name"
        placeholder="Ajouter votre nom"
        onChange={e => setName(e.target.value)}
      /><br/>
      <Button>Démarrer</Button>
    </form>
  );
};

const styles = {
  container: {
    textAlign: 'center'
  },
  margin: {
    marginTop:10,
    marginBottom: 10
  }
}

export default CodePage;
