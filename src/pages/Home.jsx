import {
  Container,
  ExchangeForm,
  ExchangeInfo,
  Heading,
  Section,
} from 'components';
import { useSelector } from 'react-redux';
import { selectExchangeInfo } from 'reduxState/currencySlice';

const Home = () => {
  const isError = false;
  const exchangeInfo = useSelector(selectExchangeInfo);
  return (
    <Section>
      <Container>
        <Heading info title="What currencies do you want to exchange?🙂" />
        <ExchangeForm />
        {exchangeInfo && <ExchangeInfo {...exchangeInfo} />}
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 Check the data validity and try again!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Home;
