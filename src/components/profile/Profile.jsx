import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux'

import { getProfileInput } from '../../redux/profilesReducers/selectors'
import { getProfiles} from '../../redux/profilesReducers/selectors'

import SubmitButton from '../UI/SubmitButton';
import TwoEntitiesView from '../UI/TwoEntitiesView'

export const Profile = ({setProfile, submitProfile}) => {
    const inputs = useSelector(getProfileInput)
    const profiles = useSelector(getProfiles)
    // console.log(profiles)
    return <>
        <h1>Profile page</h1>
        <div>
            {
                profiles.map((profile, idx) => 
                    <TwoEntitiesView 
                        name={profile.name} 
                        text={profile.isMember === 'on' ? 'Member of chats' : 'Not a member'} 
                        key={idx} 
                    />
                )
            }
        </div>
        <form className="message-form">
            <div className="message-form_container">
            <TextField 
                id="outlined-basic" 
                label="Name" 
                name="name"
                value={inputs.name} 
                onChange={setProfile}
                variant="outlined" 
                margin="normal" 
                />
            <label>
                <input type="checkbox" name="isMember" onChange={setProfile} />
                Are you a member?
            </label>
            {/* <Button 
                onClick={submitProfile} 
                variant="contained" 
                color="success"
                >Send info</Button> */}
            <SubmitButton onClick={submitProfile}>Send info</SubmitButton>
            </div>
        </form>
    </>
}
// подключить стр к редакс, добавить чекбокс и сохранить в сторе