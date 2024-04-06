import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';
import { useDispatch } from 'react-redux';
import { changeCurrency } from 'reduxState/operetions';

export const ExchangeForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    const input = e.target.exhange.value;
    const isValidValue = /^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$/.test(
      input,
    );
    if (!isValidValue) return;
    const [amount, from, , to] = input.split(' ');
    const data = { amount, from, to };
    dispatch(changeCurrency(data));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        name="exhange"
        title="Request format 15 USD in UAH"
        className={styles.input}
      />
    </form>
  );
};
