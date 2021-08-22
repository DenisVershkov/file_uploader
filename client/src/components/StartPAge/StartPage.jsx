import "./StartPage.css";
import Modal from '../Modal/Modal';
import { useState } from "react";
import SignUpForm from '../SignUp-form/SignUp-form';
import SignInForm from '../SignIn-form/SignIn-form';

const StartPage = () => {
  const [modalActive, setModalActive] = useState(false);
  const [modalChildren, setModalChildren] = useState('');

  function clickHandler(e) {
    setModalActive(true);
    setModalChildren(e.target.id);
  }

  return (
<div className="wrapper">
  <div className="container">
  <span className="text">Загружатор</span>
  <button className="signIn" id='signIn' onClick={clickHandler}>Войти</button>
  <button className="signUp" id='signUp' onClick={clickHandler}>Зарегистрироваться</button>
  </div>
  <Modal active={modalActive} setActive={setModalActive}>
    {modalChildren === 'signIn' && <SignInForm /> || <SignUpForm />}
  </Modal>
</div>
  )
}

export default StartPage;

