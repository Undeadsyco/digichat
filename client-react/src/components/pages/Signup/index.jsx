// Dependencies
import * as yup from 'yup';
// Components
import CustumForm from '../../global/Form';
import CustomField from '../../global/Form/Field';
// Actions
import { utilActions } from '../../../actions';
import { useOutletContext } from 'react-router-dom';

const validate = yup.object({
  fullName: yup.string().required('Your Full Name Is Required').min(3, 'Your Name Must Be 4 Characters Long Or More'),
  email: yup.string().email('Invalid Email Address').required('You Need An Email To Sign Up'),
  userName: yup.string().required('You Need To Create A User Name').min(5, 'Your User Name Must Required A Minimum Of 5 Characters'),
  password: yup.string().required().min(8, 'Your Password Must Be A Minimum Of 8 Characters')
})

/**
 * Component for the signup page
 * @param {Object} props
 * @param {Function} props.dispatch
 * @returns {React.Component}
 */
const SignUp = () => {
  const { actions: { onSignUp } } = useOutletContext();

  return (
    <main className="bg-white place-content-center subgrid z-0 p-4 relative col-span-full row-start-2 row-span-8">
      <CustumForm {...{
        title: 'Sign Up',
        className: 'signup-form',
        initialValues: {
          fullName: '',
          email: '',
          userName: '',
          password: ''
        },
        schema: validate,
        onSubmit: onSignUp,
      }}>
        <CustomField {...{ name: 'fullName', type: 'text', label: 'Full Name', icon: 'id-badge' }} />
        <CustomField {...{ name: 'userName', type: 'text', label: 'User Name', icon: 'address-book' }} />
        <CustomField {...{ name: 'email', type: 'email', label: 'Email', icon: 'envelope' }} />
        <CustomField {...{ name: 'password', type: 'password', label: 'Password', icon: 'lock' }} />
      </CustumForm>
    </main>
  );
}
export default SignUp;