import './SignUp-form.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUp } from '../../redux/actions/user.ac';

const SignUpForm = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState({ email: "", password: "" , username: ""});

  function submitHandler(e) {
    e.preventDefault();
    let payload = formFields;
    dispatch(signUp(payload, history))
  }

  function changeHandler(e) {
    const field = e.target.dataset.id;
    const newValue = e.target.value;
    setFormFields((prev) => ({ ...prev, [field]: newValue }));
  }

  return (
    <div className="login-box">
  <h2>Register</h2>
  <form onSubmit={submitHandler}>
    <div className="user-box">
      <input type="text" value={formFields.username} onChange={changeHandler} data-id="username"/>
      <label>Username</label>
    </div>
    <div className="user-box">
      <input type="text" value={formFields.email} onChange={changeHandler} data-id="email"/>
      <label>Email</label>
    </div>
    <div className="user-box">
      <input type="password" value={formFields.password} onChange={changeHandler} data-id="password"/>
      <label>Password</label>
    </div>
    <button href="#">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </button>
  </form>
</div>
  )
}

export default SignUpForm;
