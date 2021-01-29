import React from 'react';
import { Funnel, DropDownIcon } from '../../../assets/images';

import {
  Container,
  Header,
  Filter,
  ListSalesContainer,
  LabelContainer,
  LabelItems,
  SalesContainer,
  Item,
} from './styles';

const UserListSales: React.FC = () => {
  return (
    <Container>
      <Header>
        <h3 className="title">Suas Vendas</h3>
        <Filter>
          <Funnel />
          <select className="filter-select" name="filter" defaultValue="Todos">
            <option value="Todos">Todos</option>
          </select>
          <DropDownIcon />
        </Filter>
      </Header>
      <ListSalesContainer>
        <LabelContainer>
          <LabelItems>
            <span className="nameTitle">Nome</span>
            <span className="vgvTitle">VGV</span>
          </LabelItems>
        </LabelContainer>

        <SalesContainer>
          <Item />
        </SalesContainer>
      </ListSalesContainer>
    </Container>
  );
};

export default UserListSales;
