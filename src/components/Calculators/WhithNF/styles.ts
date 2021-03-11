import styled from 'styled-components';

interface TableProps {
  cols?: number;
}

export const Wrapper = styled.section``;

export const Container = styled.div`
  width: 100%;
  display: flex;
  margin-top: 2rem;
`;
export const Asaid = styled.aside`
  width: 20%;
  padding: 0 0.5rem;

  > span {
    display: block;
    font-weight: 500;
    font-size: 2rem;
    line-height: 2.3rem;

    color: #4f4f4f;
    margin-bottom: 2rem;
  }

  > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 2px solid ${({ theme }) => theme.colors.primaryAlpha};

    > div {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;

      > span {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: normal;
        font-size: 1.2rem;
        line-height: 2rem;

        color: #4f4f4f;
      }

      > .inputContainer {
        > div {
          width: 11rem;
          height: 4rem;

          background: rgba(196, 196, 196, 0.7);
          border-radius: 4px;
          border: 0;
          font-size: 16px;
          line-height: 19px;

          color: #4f4f4f;
          margin-right: 1rem;

          > input {
            width: 100%;
          }
        }
      }

      & + div {
        margin-top: 0.8rem;
      }
    }
  }
`;

export const Main = styled.main`
  width: 80%;
  padding: 0 1rem;
`;
export const Table = styled.table<TableProps>`
  thead,
  tbody {
    display: block;
  }
  > thead {
    text-align: left;
    > tr {
      display: grid;
      grid-template-columns: repeat(${props => props.cols}, 125px);
      grid-gap: 0.8rem;

      > th {
        display: block;
        width: 100px;
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 2.3rem;

        color: #4f4f4f;

        &.comission-header {
          padding-left: 2.8rem;
        }
      }
    }
  }
  > tbody {
    text-align: left;

    > tr {
      display: grid;
      grid-template-columns: repeat(${props => props.cols}, 125px);
      border-collapse: collapse;
      border-spacing: 8px;
      grid-gap: 0.8rem;
      > td {
        display: flex;
        flex-direction: column;
        padding: 1.5rem 0;

        > strong {
          font-weight: normal;
          font-size: 1.6rem;
          line-height: 2.3rem;

          color: #4f4f4f;
          display: block;
          margin-bottom: 0.4rem;
        }
        > span {
          font-size: 1.2rem;
          line-height: 1.4rem;

          color: ${({ theme }) => theme.colors.primary};
        }
        > input {
          width: 113px;
          height: 40px;
          background: rgba(196, 196, 196, 0.3);
          border-radius: 4px;

          border: 0;
          padding-left: 1rem;
          font-size: 16px;
          line-height: 19px;

          color: #4f4f4f;

          &.input-background-dark {
            background: rgba(196, 196, 196, 0.7);
            border-radius: 4px;

            border: 0;
            padding-left: 1.2rem;
            font-size: 16px;
            line-height: 19px;

            color: #4f4f4f;
          }
        }
        &.comission {
          display: flex;
          align-items: center;
          justify-content: center;

          padding-left: 0.4rem;
          border-left: 1px solid ${({ theme }) => theme.colors.primaryAlpha};
          border-bottom: 1px solid ${({ theme }) => theme.colors.primaryAlpha};

          > span {
            font-size: 1.8rem;
            font-weight: bold;
            color: ${({ theme }) => theme.colors.primary};
          }
        }
      }

      .border-none {
        border: none;
        padding: 1.2rem;
        font-size: 2.4rem;
        font-weight: 500;
      }

      .total {
        padding: 1.2rem;
        border-bottom: 1px solid #504c4c;
        font-size: 1.8rem;
        font-weight: 500;
      }
    }
    .total-row {
      border-left: 0;
      border-bottom: 0;
    }
  }
`;

export const Footer = styled.section`
  margin-top: 2rem;
  padding: 0 8rem;

  .edit {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    > button {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100px;
      height: 30px;
      font-size: 12px;

      > svg {
        margin-right: 5px;
      }
    }
  }
  > table {
    width: 80%;

    thead {
      border-bottom: 1px solid ${({ theme }) => theme.colors.primaryAlpha};
      > tr {
        text-align: center;
      }
    }

    tbody {
      tr {
        td {
          input {
            height: 3rem;
            &.porcent {
              height: 2rem;
              background: rgba(196, 196, 196, 0.7);
              border-radius: 4px 4px 0px 0px;
            }
            &.disabled {
              background: transparent;
            }
          }
        }
      }
    }
  }

  > .save {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > button {
      display: flex;
      align-items: center;
      justify-content: center;

      > svg {
        margin-right: 0.8rem;
      }
    }
  }
`;
