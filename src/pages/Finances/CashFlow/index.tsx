import React, {useState} from 'react';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';
import FinancesLayout from '../../Layouts/FinancesLayout';
import CashFlowBalanceBanks from './components/CashFlowBalanceBanks';
import CashFlowEntry from './components/CashFlowEntry';
import CashFlowExits from './components/CashFlowExits';
import { Container } from './styles';

const CashFlow: React.FC = () => {
  const [typeTab, setTypeTab] = useState('entry');
  const handleSetTab = (tabName: string | null) => {
    if (tabName) {
      setTypeTab(tabName);
    }
  };

  return (
    <FinancesLayout>
      <Container>
        <Tabs
        id="tab-container"
        className="tab-container"
        activeKey={typeTab}
        onSelect={tab => handleSetTab(tab)}
        variant="tabs"
      >
        <TabBootstrap eventKey="entry" title="Entradas">
          <CashFlowEntry />
        </TabBootstrap>
        <TabBootstrap eventKey="exits" title="Saídas">
          <CashFlowExits />
        </TabBootstrap>
        <TabBootstrap eventKey="bankBalances" title="Saldos">
          <CashFlowBalanceBanks />
        </TabBootstrap>
      </Tabs>
      </Container>
    </FinancesLayout>
  );
}

export default CashFlow;