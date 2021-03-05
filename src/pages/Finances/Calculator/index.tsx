import React, { useState } from 'react';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';
import WhithNF from '../../../components/Calculators/WhithNF';
import AdmLayout from '../../Layouts/Adm';

import { Container, CalculatorContainer, HeaderCalc } from './styles';

const Calculator: React.FC = () => {
  const [typeTab, setTypeTab] = useState('calc-slz');
  const handleSetTab = (tabName: string | null) => {
    if (tabName) {
      setTypeTab(tabName);
    }
  };
  return (
    <AdmLayout>
      <Container>
        <CalculatorContainer>
          <Tabs
            id="tab-container"
            className="tab-container"
            activeKey={typeTab}
            onSelect={tab => handleSetTab(tab)}
            variant="tabs"
          >
            <TabBootstrap eventKey="calc-slz" title="São Luís">
              <HeaderCalc>
                <h1>Calculadora</h1>
                <div>
                  <span>Selecione o tipo de calculadora</span>
                  <select name="type_calc">
                    <option value="nota-fiscal">Imóvel com NF</option>
                  </select>
                </div>
              </HeaderCalc>
              <WhithNF />
            </TabBootstrap>
            <TabBootstrap eventKey="calc-ftlz" title="Fortaleza">
              <HeaderCalc>
                <h1>Calculadora</h1>
                <div>
                  <span>Selecione o tipo de calculadora</span>
                  <select name="type_calc">
                    <option value="nota-fiscal">Imóvel com NF</option>
                  </select>
                </div>
              </HeaderCalc>
            </TabBootstrap>
            <TabBootstrap eventKey="calc-trz" title="Teresina">
              <HeaderCalc>
                <h1>Calculadora</h1>
                <div>
                  <span>Selecione o tipo de calculadora</span>
                  <select name="type_calc">
                    <option value="nota-fiscal">Imóvel com NF</option>
                  </select>
                </div>
              </HeaderCalc>
            </TabBootstrap>
          </Tabs>
        </CalculatorContainer>
      </Container>
    </AdmLayout>
  );
};

export default Calculator;
