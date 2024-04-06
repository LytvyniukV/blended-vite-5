import { Wave } from 'react-animated-text';
import { Container, Heading, RatesList, Section } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ratesCurrency } from 'reduxState/operetions';
import {
  selectBaseCurrency,
  selectFilteredRates,
} from 'reduxState/currencySlice';

const Rates = () => {
  const isError = false;
  const rates = useSelector(selectFilteredRates);
  const baseCurrency = useSelector(selectBaseCurrency);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!baseCurrency) {
      return;
    }
    dispatch(ratesCurrency());
  }, [dispatch, baseCurrency]);

  return (
    <Section>
      <Container>
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />
        <RatesList rates={rates} />
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Rates;
