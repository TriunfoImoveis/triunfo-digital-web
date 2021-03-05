import React from 'react';

import { Container, Asaid, Main, Table, Wrapper, Footer } from './styles';

const WhithNF: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <Asaid>
          <span>Imóveis com NF</span>
          <div>
            <div>
              <span>Construtora</span>
              <input type="text" />
            </div>
            <div>
              <span>N° NF</span>
              <input type="text" />
            </div>
            <div>
              <span>Valor total NF</span>
              <input type="text" />
            </div>
            <div>
              <span>Taxa de ISS imposto NF</span>
              <input type="text" />
            </div>
            <div>
              <span>Debito ISS</span>
              <input type="text" />
            </div>
            <div>
              <span>Taxa total do Imposto NF</span>
              <input type="text" />
            </div>
            <div>
              <span>Recolhimento de Imposto</span>
              <input type="text" />
            </div>
          </div>
        </Asaid>
        <Main>
          <Table cols={6}>
            <thead>
              <tr>
                <th>Participantes</th>
                <th>% de comissão</th>
                <th>Comissão bruta</th>
                <th>% do Imposto</th>
                <th>$ do Imposto</th>
                <th>Comissão líquida</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Corretor</strong>
                  <span>Rafael Serejo</span>
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" className="input-background-dark" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" className="input-background-dark" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Coordenador</strong>
                  <span>Gregory Mike</span>
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" className="input-background-dark" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" className="input-background-dark" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Diretor</strong>
                  <span>Cristiane Sipaúba</span>
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" className="input-background-dark" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" className="input-background-dark" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Diretor</strong>
                  <span>Raunin Fernandes</span>
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" className="input-background-dark" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" className="input-background-dark" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Empresa</strong>
                  <span>Filial São Luís</span>
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" className="input-background-dark" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" className="input-background-dark" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
            </tbody>
          </Table>
        </Main>
      </Container>
      <Footer>
        <div className="header">
          <input type="text" defaultValue="PL" />
          <input type="text" defaultValue="Lucro" />
          <input type="text" defaultValue="Imposto" />
          <input type="text" defaultValue="Construção" />
          <input type="text" defaultValue="Salário" />
          <input type="text" defaultValue="Dev Danielle" />
          <span>Saldo</span>
        </div>
        <div className="content">
          <div>
            <input type="text" className="porcent" />
            <input type="text" className="value" />
          </div>
          <div>
            <input type="text" className="porcent" />
            <input type="text" className="value" />
          </div>
          <div>
            <input type="text" className="porcent" />
            <input type="text" className="value" />
          </div>
          <div>
            <input type="text" className="porcent" />
            <input type="text" className="value" />
          </div>
          <div>
            <input type="text" className="porcent" />
            <input type="text" className="value" />
          </div>
          <div>
            <input type="text" className="porcent" />
            <input type="text" className="value" />
          </div>
          <div>
            <input type="text" className="porcent" />
            <input type="text" className="value" />
          </div>
        </div>
      </Footer>
    </Wrapper>
  );
};

export default WhithNF;
