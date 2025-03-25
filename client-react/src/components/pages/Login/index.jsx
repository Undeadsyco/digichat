// Dependencies
import * as yup from 'yup';
// Components
import CustomForm from '../../global/Form';
import CustomField from '../../global/Form/Field';
// Actions
import { utilActions } from '../../../actions';
import { useSetRecoilState } from 'recoil';
import { Modal, Redirect, AppUser, Error } from '../../../state/atoms';

const schema = yup.object({
  email: yup.string().email('Must Be A Valid Email Address').required('Email Address Is Required'),
  password: yup.string().required("Password Is Required").min(8, 'Your Password Must Be A Minimum Of 8 Characters')
});

/**
 * Component for the login page
 * @param {Object} props
 * @param {Function} props.dispatch
 * @returns 
 */
const Login = () => {
  const setUser = useSetRecoilState(AppUser);
  const setModal = useSetRecoilState(Modal);
  const setError = useSetRecoilState(Error);
  const setRedirect = useSetRecoilState(Redirect);

  const onLogin = async (values, actions) => {
    actions.setSubmitting(true);
    setModal(prev => ({ ...prev, display: true, loading: true }));
    try {
      const res = await utilActions.login(values);
      if (!res) throw new Error('Log In Failed');
      setUser(res);
      setModal(prev => ({ ...prev, display: false, loading: false }));
    } catch (error) {
      setError(error);
    } finally {
      actions.resetForm();
      actions.setSubmitting(false);
      setRedirect('/feed');
    }
  }

  return (
    <main className="bg-white place-content-center subgrid z-0 p-4 relative col-span-full row-start-2 row-span-8  ">
      {/** @component CustomForm */}
      <span className=' w-full hidden sm:flex col-span-2 row-span-3 row-start-2  md:col-start-3 md:col-span-3 md:row-start-3 md:row-span-5 justify-center items-center'>
        <img className='max-h-full' src="/logo.png" alt="Digi Chat Logo" />
      </span>
      <CustomForm {...{
        title: "Log In",
        className: `login-form`,
        initialValues: { email: '', password: '', },
        schema,
        onSubmit: onLogin,
      }}>
        <CustomField {...{ name: 'email', type: 'email', icon: 'envelope', label: "Email" }} />
        <CustomField {...{ name: 'password', type: 'password', icon: 'lock', label: "Password" }} />
      </CustomForm>
    </main>
  )
}

export default Login;
