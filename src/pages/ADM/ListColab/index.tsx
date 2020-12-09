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

const ListColab: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const user = {
    id: '123456',
  };
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
              <span>Departamento: </span>
              <select name="" id="">
                <option>Todos</option>
                <option>Comercial</option>
                <option>Administrativo</option>
              </select>
            </FiltersBottonItems>
            <FiltersBottonItems>
              <span>Cargo: </span>
              <select name="" id="">
                <option>Todos</option>
                <option>Corretor</option>
                <option>MQL</option>
                <option>Finaceiro</option>
              </select>
            </FiltersBottonItems>
            <FiltersBottonItems>
              <Link to="/adm/novo-colaborador">Novo Colaborador</Link>
            </FiltersBottonItems>
          </FiltersBotton>
        </FiltersContainer>
      </Form>
      <Content>
        <SaleTableContainer>
          <SaleHeader>
            <HeaderItem />
            <HeaderItem>Nome</HeaderItem>
            <HeaderItem>Departamento</HeaderItem>
            <HeaderItem>Cargo</HeaderItem>
          </SaleHeader>
          <SaleBody>
            <SaleItem className="avatar">
              <img src="https://imgur.com/I80W1Q0.png" alt="Corretor" />
            </SaleItem>
            <SaleItem>José Corretor</SaleItem>
            <SaleItem>Comercial</SaleItem>
            <SaleItem>Corretor</SaleItem>
            <SaleItem>
              <Link to={`/adm/detalhes-colaborador/${user.id}`}>
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

export default ListColab;
