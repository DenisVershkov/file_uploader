import './Modal.css'

const Modal = ({ active, setActive, children }) => {
return (
  <div className={active ? 'modalka active' : 'modalka'} onClick={() => setActive(false)}>
<div className={active ? 'modalka__content active' : 'modalka__content'} onClick={e => e.stopPropagation()}>
  {children}
</div>
  </div>
)
}

export default Modal;
