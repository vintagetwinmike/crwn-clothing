import { useState } from 'react';
import { signInWithGooglePopup, signInWithEmail, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import Button from '../button/button.component';
import '../sign-in-form/sign-in-form.styles.scss';
import FormInput from '../form-input/form-input.component';


const defaultFormFields = {
    email: '',
    password: ''
}
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInWithEmail(email, password);
            console.log(user);
            resetFormFields();

        } catch(error) {
            if (error.code === 'auth/wrong-password') {
                alert('incorrect password');
            } else {
                console.log('log in error: ', error);
            }
            
        }
 
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className='sign-in-container'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
            <FormInput label="email" type="text" required name="email" onChange={handleChange} value={email} />
            <FormInput label="password" type="password" required name="password" onChange={handleChange} value={password} />
            <div className='buttons-container'>
                <Button type="submit">
                    Sign in
                </Button>   
                <Button type="button" buttonType='google' onClick={signInWithGoogle}>
                    Google Sign In
                </Button>      
            </div>
          
            </form>


        </div>
    )
}

export default SignInForm