import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux'

import { getProfileInput } from '../../redux/profilesReducers/selectors'
import { getProfiles} from '../../redux/profilesReducers/selectors'

export const Profile = ({setProfile, submitProfile}) => {
    const inputs = useSelector(getProfileInput)
    const profiles = useSelector(getProfiles)
    // console.log(profiles)
    return <>
        <h1>Profile page</h1>
        <div>
            {
                profiles.map((profile, idx) => 
                    <div key={idx}>
                        <div>{profile.name}</div>
                        {profile.isMember === 'on' &&
                            <p>Member of chats</p>
                        } 
                    </div>
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
            <Button 
                onClick={submitProfile} 
                variant="contained" 
                color="success"
                >Send info</Button>
            </div>
        </form>
    </>
}
// подключить стр к редакс, добавить чекбокс и сохранить в сторе