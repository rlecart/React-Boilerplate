export const SYNC_HOME_DATA = 'SYNC_HOME_DATA';

const setNewHomeInfo = (dispatch, newHomeInfo) => {
  let action = {
    type: SYNC_HOME_DATA,
    value: {
      profil: newHomeInfo.newProfil,
      joinUrl: newHomeInfo.newJoinUrl,
      owner: newHomeInfo.newOwner,
    },
  };
  dispatch(action);
};

export { setNewHomeInfo };