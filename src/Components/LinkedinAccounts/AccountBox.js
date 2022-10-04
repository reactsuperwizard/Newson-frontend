import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsFillChatTextFill } from "react-icons/bs";
import { useSnackbar } from 'react-simple-snackbar';
import { createRecord } from '../../Config/apiFunctions';
import { useSelector } from "react-redux";
import { selectProfile } from "../../features/profile/profileSlice";
import routes from '../../Config/routes/api';

const { userLinkedinAccountDisconnectRoute } = routes;

export default function AccountBox({ data, refetch, setSelectedLinkedinAccount, setReconnectShow }) {
  const [openSnackbar, closeSnackbar] = useSnackbar();
  const user = useSelector(selectProfile);
  const [disconnecting, setDisconnecting] = useState(false);

  const handleDisconnect = async () => {
    setDisconnecting(true)

    try {
        await createRecord({
            url: `${userLinkedinAccountDisconnectRoute}${data.id}/`,
            values: {},
            user,
        });
        refetch();
        openSnackbar('Linkedin Account Is Disconnected.')
    } catch (err) {
        console.log(err);
        if (err && err.response && err.response.data && err.response.data.column) {
            openSnackbar(err.response.data.column)
        } else {
            openSnackbar("Sorry, something went wrong, please try again later.")
        }
    } finally {
      setDisconnecting(false);
    }
};

  return (
    <div className='account-box box-card text-center p-4 me-4 mb-3'>
        {data.msgCount ? 
         <span className='unread-msg py-1 px-2'><BsFillChatTextFill size={13} className='me-1' /> {data.msgCount}</span> :
         null}
        <img src={data.avatar} alt='' />
        <div className='active-status mt-2 mb-2'>
            <span className={data.connected && data.ready_for_use ? 'active me-1' : 'inactive me-1'}></span>
            {data.connected && data.ready_for_use ? 'Active' : 'Inactive'}
        </div>
        <p className='email mb-0'>{data.name || data.username}</p>
        <p className='connect-status'>{data.connected ? 'Connected to Linkedin' : 'Not Connected'}</p>
        {data.connected ? 
         <Button variant='primary' onClick={handleDisconnect}>Disconnect Account</Button> :
         <Button variant='primary' onClick={() => {
          setSelectedLinkedinAccount(data)
          setReconnectShow(true)
         }}>Reconnect Account</Button>}
    </div>
  )
}
