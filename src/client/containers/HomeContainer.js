import React from 'react';
import { connect } from 'react-redux';

import api from "../api/clientApi";
import openSocket from 'socket.io-client';
import { addSocket } from '../actions/socketAction';
import { setNewHomeInfo } from '../actions/homeAction';
import ProfilPanel from '../components/ProfilPanel';
import TopPanel from '../components/TopPanel';
import BottomPanel from '../components/BottomPanel';
import RoomSelectorPanel from '../components/RoomSelectorPanel';
import Display from '../components/Display';

const Home = ({
  dispatch,
  history,
  socketReducer,
  homeReducer,
}) => {
  const [whichButton, setWhichButton] = React.useState(undefined);

  const handleChange = (event) => {
    let newProfil = homeReducer.profil;
    let newJoinUrl = homeReducer.joinUrl;

    if (event && event.target
      && (event.target.name === 'name' || event.target.name === 'roomUrl')) {
      if (event.target.name === 'name')
        newProfil = { name: event.target.value };
      else if (event.target.name === 'roomUrl')
        newJoinUrl = event.target.value;
      setNewHomeInfo(dispatch, {
        newProfil: newProfil,
        newJoinUrl: newJoinUrl,
        newOwner: undefined,
      });
    }
  };

  React.useEffect(() => {
    let socket;

    if (!socketReducer.socket) {
      socket = openSocket('http://0.0.0.0:3004');
      addSocket(dispatch, socket);
    }
    return (() => { });
  }, []);

  const submitForm = (event) => {
    return (new Promise((res, rej) => {
      event.preventDefault();
      if (whichButton === 'joinRoom') {
        setWhichButton(undefined);
        api.joinRoom(socketReducer.socket, homeReducer.profil, homeReducer.joinUrl)
          .then((url) => {
            setNewHomeInfo(dispatch, {
              newProfil: homeReducer.profil,
              newJoinUrl: url,
              newOwner: false
            });
            history.push(`/#${url}[${homeReducer.profil.name}]`);
            res();
          })
          .catch((err) => { rej(err); });
      }
      else if (whichButton === 'createRoom') {
        setWhichButton(undefined);
        api.createRoom(socketReducer.socket, homeReducer.profil)
          .then((url) => {
            setNewHomeInfo(dispatch, {
              newProfil: homeReducer.profil,
              newJoinUrl: url,
              newOwner: true
            });
            history.push(`/#${url}[${homeReducer.profil.name}]`);
            res();
          })
          .catch((err) => { rej(err); });
      }
      else
        res();
    }));
  };

  return (
    <Display>
      <div className="homeMenu">
        <TopPanel />
        <BottomPanel>
          <form onSubmit={submitForm}>
            <ProfilPanel
              homeReducer={homeReducer}
              handleChange={handleChange}
            />
            <RoomSelectorPanel
              homeReducer={homeReducer}
              whichButton={whichButton}
              setWhichButton={setWhichButton}
              handleChange={handleChange}
            />
          </form>
        </BottomPanel>
      </div>
    </Display>
  );
};

const mapStateToProps = (state) => {
  return (state);
};

export default connect(mapStateToProps)(Home);