import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WhithNF from '../../../components/Calculators/WhithNF';
import FinancesLayout from '../../Layouts/FinancesLayout';
import { Container, CalculatorContainer, HeaderCalc } from './styles';
import api from '../../../services/api';
import { money } from '../../../utils/masked';
import { useCalculator } from '../../../context/CalculatorContext';

type Params = {
  id: string;
};

const Calculator: React.FC = () => {
  const { id } = useParams<Params>();
  const { handleSetComission } = useCalculator();

  useEffect(() => {
    const loadSale = async () => {
      const response = await api.get(`/installment/${id}`);
      const { data } = response;
      const installment = data;
      const responseSale = await api.get(`/sale/${installment.sale.id}`);

      const sale = responseSale.data;
      const installmentFormatted = {
        id: installment.id,
        value: Number(installment.value),
        valueBRL: money(Number(installment.value)),
        id_sale: sale.id,
        type_sale: sale.sale_type,
        sellers: sale.sale_has_sellers,
        captvators: sale.sale_has_captivators || null,
        coordinator: sale.user_coordinator || null,
        directors: sale.users_directors,
        subsidiary: sale.realty.city,
        builder: sale.builder ? sale.builder.name : null,
      };
      handleSetComission(installmentFormatted);
    };
    loadSale();
    // eslint-disable-next-line
  }, [id]);
  return (
    <FinancesLayout>
      <Container>
        <CalculatorContainer>
          <HeaderCalc>
            <h1>Calculadora</h1>
            <div>
              <span>Selecione o tipo de calculadora</span>
              <select name="type_calc">
                <option value="nota-fiscal">Imóvel com NF</option>
              </select>
            </div>
          </HeaderCalc>
          <WhithNF id={id} />
        </CalculatorContainer>
      </Container>
    </FinancesLayout>
  );
};

export default Calculator;
