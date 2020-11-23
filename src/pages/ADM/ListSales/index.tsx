import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import AdmLayout from '../../Layouts/Adm';
import { Search, Filter } from '../../../assets/images';
import {
  FiltersContainer,
  FiltersTop,
  FiltersBotton,
  FiltersBottonItems,
  Input,
  FilterDiv,
  Content,
  SaleTableContainer,
  HeaderItem,
  SaleHeader,
  SaleBody,
  SaleItem,
} from './styles';

const ListSales: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  return (
    <AdmLayout>
      <Form
        ref={formRef}
        onSubmit={() => {
          console.log('');
        }}
      >
        <FiltersContainer>
          <FiltersTop>
            <Input>
              <Search />
              <input type="text" placeholder="Buscar por corretor" />
            </Input>
            <FilterDiv>
              <Filter />
              <select>
                <option selected disabled>
                  Filtar por
                </option>
                <option>Construtora</option>
              </select>
            </FilterDiv>
            <FilterDiv>
              <select>
                <option>Dimensão</option>
              </select>
            </FilterDiv>
          </FiltersTop>
          <FiltersBotton>
            <FiltersBottonItems>
              <span>Cidade: </span>
              <select name="" id="">
                <option>São Luís</option>
                <option>Fortaleza</option>
                <option>Teresina</option>
              </select>
            </FiltersBottonItems>
            <FiltersBottonItems>
              <span>Vendas: </span>
              <select name="" id="">
                <option>PENDENTE</option>
                <option>PAGO</option>
                <option>EM PARTE</option>
              </select>
            </FiltersBottonItems>
            <FiltersBottonItems>
              <span>Corretores: </span>
              <select name="" id="">
                <option>Todos</option>
                <option>José Rocha</option>
                <option>Rafael</option>
              </select>
            </FiltersBottonItems>
            <FiltersBottonItems>
              <button type="button">Adicionar ao relatório</button>
            </FiltersBottonItems>
          </FiltersBotton>
        </FiltersContainer>
      </Form>
      <Content>
        <SaleTableContainer>
          <SaleHeader>
            <HeaderItem />
            <HeaderItem>Nome</HeaderItem>
            <HeaderItem>Valor</HeaderItem>
          </SaleHeader>
          <SaleBody>
            <SaleItem>
              <img src="https://imgur.com/I80W1Q0.png" alt="Corretor" />
            </SaleItem>
            <SaleItem>José Corretor</SaleItem>
            <SaleItem>R$ 58.000.000,00</SaleItem>
            <SaleItem>20/11/2020</SaleItem>
            <SaleItem>
              <Link to="#top">
                <FaPlus size={15} color="#c32925" />
                Detalhes
              </Link>
            </SaleItem>
          </SaleBody>
          <SaleBody>
            <SaleItem>
              <img src="https://imgur.com/I80W1Q0.png" alt="Corretor" />
            </SaleItem>
            <SaleItem>José Corretor</SaleItem>
            <SaleItem>R$ 58.000.000,00</SaleItem>
            <SaleItem>20/11/2020</SaleItem>
            <SaleItem>
              <Link to="#top">
                <FaPlus size={15} color="#c32925" />
                Detalhes
              </Link>
            </SaleItem>
          </SaleBody>
          <SaleBody>
            <SaleItem>
              <img src="https://imgur.com/I80W1Q0.png" alt="Corretor" />
            </SaleItem>
            <SaleItem>José Corretor</SaleItem>
            <SaleItem>R$ 58.000.000,00</SaleItem>
            <SaleItem>20/11/2020</SaleItem>
            <SaleItem>
              <Link to="#top">
                <FaPlus size={15} color="#c32925" />
                Detalhes
              </Link>
            </SaleItem>
          </SaleBody>
          <SaleBody>
            <SaleItem>
              <img src="https://imgur.com/I80W1Q0.png" alt="Corretor" />
            </SaleItem>
            <SaleItem>José Corretor</SaleItem>
            <SaleItem>R$ 58.000.000,00</SaleItem>
            <SaleItem>20/11/2020</SaleItem>
            <SaleItem>
              <Link to="#top">
                <FaPlus size={15} color="#c32925" />
                Detalhes
              </Link>
            </SaleItem>
          </SaleBody>
        </SaleTableContainer>
      </Content>
    </AdmLayout>
  );
};

export default ListSales;
