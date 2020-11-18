import React from 'react';
import Header from '../../../components/Header';

import { BackgroundTriunfo, Search, Filter } from '../../../assets/images';
import {
  Container,
  Content,
  FiltersContainer,
  FiltersGroup,
  Input,
  FilterDiv,
} from './styles';

const ListSales: React.FC = () => {
  return (
    <Container>
      <Header type="adm" />
      <BackgroundTriunfo />
      <Content>
        <FiltersContainer>
          <FiltersGroup>
            <Input>
              <Search />
              <input type="text" placeholder="Buscar por corretor" />
            </Input>
            <FilterDiv>
              <Filter />
              <span>Filtrar por</span>
            </FilterDiv>
          </FiltersGroup>
        </FiltersContainer>
      </Content>
    </Container>
  );
};

export default ListSales;
