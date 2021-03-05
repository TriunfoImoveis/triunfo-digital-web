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
  width: 30%;
  padding: 0 0.5rem;

  > span {
    display: block;
    font-weight: 500;
    font-size: 2rem;
    line-height: 2.3rem;

    color: #4f4f4f;
    margin-bottom: 2rem;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 2px solid ${({ theme }) => theme.colors.primaryAlpha};

    > div {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      text-align: right;

      > span {
        font-weight: normal;
        font-size: 1.6rem;
        line-height: 2rem;

        color: #4f4f4f;
      }

      > input {
        width: 12.5rem;
        height: 4rem;

        background: rgba(196, 196, 196, 0.7);
        border-radius: 4px;
        border: 0;
        padding-left: 1.2rem;
        font-size: 16px;
        line-height: 19px;

        color: #4f4f4f;
        margin-right: 1rem;
      }

      & + div {
        margin-top: 1.5rem;
      }
    }
  }
`;

export const Main = styled.main`
  flex: 1;
  padding: 0 1rem;
`;
export const Table = styled.table<TableProps>`
  thead,
  tbody {
    display: block;
  }
  > thead {
    text-align: left;
    margin-bottom: 2rem;
    > tr {
      display: grid;
      grid-template-columns: repeat(${props => props.cols}, 140px);

      > th {
        display: block;
        width: 140px;
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2.3rem;

        color: #4f4f4f;
      }
    }
  }
  > tbody {
    text-align: left;

    > tr {
      display: grid;
      grid-template-columns: repeat(${props => props.cols}, 1fr);
      border-collapse: collapse;
      border-spacing: 8px;

      > td {
        display: flex;
        flex-direction: column;
        padding: 1.5rem 0;

        > strong {
          font-weight: normal;
          font-size: 2rem;
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
          width: 100px;
          height: 40px;
          background: rgba(196, 196, 196, 0.3);
          border-radius: 4px;

          border: 0;
          padding-left: 1.2rem;
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
  > .header {
    display: grid;
    grid-template-columns: repeat(7, 150px);
    gap: 0.8rem;

    border-bottom: 1px solid ${({ theme }) => theme.colors.primary};

    > input {
      border: 0;
      text-align: center;
      font-weight: normal;
      font-size: 1.6rem;
      line-height: 2.3rem;

      color: #4f4f4f;
    }
    > span {
      text-align: center;
      vertical-align: bottom;
      font-weight: normal;
      font-size: 1.6rem;
      line-height: 2.3rem;
    }
  }

  .content {
    display: grid;
    grid-template-columns: repeat(7, 125px);
    column-gap: 0.8rem;
    padding: 0.8rem 0;
  }
`;
