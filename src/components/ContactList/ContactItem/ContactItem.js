import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';
import s from './ContactItem.module.css';

export default function ContactItem({ name, number, deleteContact, id }) {
  return (
    <>
      <div className={s.wrap}>
        <span className={s.name}>{name}</span>
        <span className={s.number}>{number}</span>
      </div>
      <button
        onClick={() => deleteContact(id)}
        type="button"
        className={s.button}
      >
        <AiOutlineClose />
      </button>
    </>
  );
}
ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
