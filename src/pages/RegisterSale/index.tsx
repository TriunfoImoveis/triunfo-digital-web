import React, { useCallback, useMemo } from 'react';
import Header from '../../components/Header';
import TabNavigator from '../../components/TabNavigator';
import Step1 from '../../components/Form/Step1';
import Step2 from '../../components/Form/Step2';
import Step3 from '../../components/Form/Step3';
import Step4 from '../../components/Form/Step4';
import ClientSaller from '../../components/Form/ClientSaller';
import SuccessForm from '../../components/Form/Success';
import { useForm } from '../../context/FormContext';
import { Container, Content, FormContainer } from './styles';

type TypeSale = 'new' | 'used';

interface Props {
  typeSale: TypeSale;
}

const RegisterSale: React.FC<Props> = ({ typeSale }) => {
  const { stepIndex, setStepIndex, saleType, setSaleType, clearAll } = useForm();

  const steps = useMemo(() => {
    if (typeSale === 'new') {
      return [
        { id: 'realty', title: 'Informações sobre o Imóvel', render: (nav: any) => <Step1 {...nav} typeSale="new" /> },
        { id: 'buyer', title: 'Dados do Cliente', render: (nav: any) => <Step2 {...nav} typeClient="buyer" /> },
        { id: 'team', title: 'Corretores, Coordenação e Diretoria', render: (nav: any) => <Step3 {...nav} typeSale="new" /> },
        { id: 'finance', title: 'Finanças', render: (nav: any) => <Step4 {...nav} typeSale="new" /> },
        { id: 'done', title: 'Venda!!', render: () => <SuccessForm typeSale="new" /> },
      ];
    }
    return [
      { id: 'realty', title: 'Informações sobre o Imóvel', render: (nav: any) => <Step1 {...nav} typeSale="used" /> },
      { id: 'buyer', title: 'Dados do Cliente Comprador', render: (nav: any) => <Step2 {...nav} typeClient="buyer" /> },
      { id: 'seller', title: 'Dados do Cliente Vendedor', render: (nav: any) => <ClientSaller {...nav} /> },
      { id: 'team', title: 'Corretores, Coordenação e Diretoria', render: (nav: any) => <Step3 {...nav} typeSale="used" /> },
      { id: 'finance', title: 'Finanças', render: (nav: any) => <Step4 {...nav} typeSale="used" /> },
      { id: 'done', title: 'Venda!!', render: () => <SuccessForm typeSale="used" /> },
    ];
  }, [typeSale]);

  const safeStepIndex = Math.min(stepIndex, steps.length - 1);

  // Se mudar o tipo de venda, limpa dados anteriores e reseta etapa
  React.useEffect(() => {
    if (saleType && saleType !== typeSale) {
      clearAll();
    }
    setSaleType(typeSale);
  }, [clearAll, saleType, setSaleType, typeSale]);

  const nextStep = useCallback(() => {
    setStepIndex(prev => Math.min(prev + 1, steps.length - 1));
  }, [setStepIndex, steps.length]);

  const prevStep = useCallback(() => {
    setStepIndex(prev => Math.max(prev - 1, 0));
  }, [setStepIndex]);

  const Current = steps[safeStepIndex].render;

  return (
    <Container>
      <Header />
      <Content>
        <header>
          <h1>Cadastrar Vendas</h1>
        </header>
        <FormContainer>
          <TabNavigator step={safeStepIndex + 1} title={steps[safeStepIndex].title} />
          <Current nextStep={nextStep} prevStep={prevStep} />
        </FormContainer>
      </Content>
    </Container>
  );
};

export default RegisterSale;
