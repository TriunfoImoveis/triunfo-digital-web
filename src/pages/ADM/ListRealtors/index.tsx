import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { BsPencil } from 'react-icons/bs';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import AdmLayout from '../../Layouts/Adm';
import { Search } from '../../../assets/images';
import {
  FiltersContainer,
  FiltersTop,
  FiltersBotton,
  FiltersBottonItems,
  Input,
  Content,
  SaleTableContainer,
  HeaderItem,
  SaleHeader,
  SaleBody,
  SaleItem,
} from './styles';

const ListRealtors: React.FC = () => {
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
              <span>Corretores: </span>
              <select name="" id="">
                <option>Todos</option>
                <option>José Rocha</option>
                <option>Rafael</option>
              </select>
            </FiltersBottonItems>
            <FiltersBottonItems>
              <button type="button">Novo Corretor</button>
            </FiltersBottonItems>
          </FiltersBotton>
        </FiltersContainer>
      </Form>
      <Content>
        <SaleTableContainer>
          <SaleHeader>
            <HeaderItem />
            <HeaderItem>Nome</HeaderItem>
            <HeaderItem>VGV</HeaderItem>
          </SaleHeader>
          <SaleBody>
            <SaleItem>
              <img src="https://imgur.com/I80W1Q0.png" alt="Corretor" />
            </SaleItem>
            <SaleItem>José Corretor</SaleItem>
            <SaleItem>R$ 58.000.000,00</SaleItem>
            <SaleItem>
              <Link to="#top">
                <BsPencil size={15} color="#c32925" />
                Editar
              </Link>
            </SaleItem>
          </SaleBody>
          <SaleBody>
            <SaleItem>
              <img src="https://imgur.com/I80W1Q0.png" alt="Corretor" />
            </SaleItem>
            <SaleItem>José Corretor</SaleItem>
            <SaleItem>R$ 58.000.000,00</SaleItem>
            <SaleItem>
              <Link to="#top">
                <BsPencil size={15} color="#c32925" />
                Editar
              </Link>
            </SaleItem>
          </SaleBody>
          <SaleBody>
            <SaleItem>
              <img src="https://imgur.com/I80W1Q0.png" alt="Corretor" />
            </SaleItem>
            <SaleItem>José Corretor</SaleItem>
            <SaleItem>R$ 58.000.000,00</SaleItem>
            <SaleItem>
              <Link to="#top">
                <BsPencil size={15} color="#c32925" />
                Editar
              </Link>
            </SaleItem>
          </SaleBody>
          <SaleBody>
            <SaleItem>
              <img src="https://imgur.com/I80W1Q0.png" alt="Corretor" />
            </SaleItem>
            <SaleItem>José Corretor</SaleItem>
            <SaleItem>R$ 58.000.000,00</SaleItem>
            <SaleItem>
              <Link to="#top">
                <BsPencil size={15} color="#c32925" />
                Editar
              </Link>
            </SaleItem>
          </SaleBody>
        </SaleTableContainer>
      </Content>
    </AdmLayout>
  );
};

export default ListRealtors;
