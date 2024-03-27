import React from 'react'
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { ButtonPagination, ButtonsContainer, Container, Content, Text } from './styled'
import Button from '../Button'

export interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}
export function Pagination({
  pageIndex,
  perPage,
  totalCount,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1
  console.log({pageIndex, pages})
  return (
    <Container>
      <Text>
        Total de {totalCount} item(s)
      </Text>

      <Content>
        <Text>
          Página {pageIndex} de {pages}
        </Text>
        <ButtonsContainer>
          <ButtonPagination
            onClick={() => onPageChange(1)} 
            disabled={pageIndex === 1}
          >
            <FiChevronsLeft size={12} />
          </ButtonPagination>
          <ButtonPagination
            onClick={() => onPageChange(pageIndex - 1)}  
            disabled={pageIndex === 1}
          >
           <FiChevronLeft size={12} />
          </ButtonPagination>
          <ButtonPagination
            onClick={() => onPageChange(pageIndex + 1)} 
            disabled={pageIndex >= pages}
          >
            <FiChevronRight size={12} />
          </ButtonPagination>
          <ButtonPagination
            onClick={() => onPageChange(pages)} 
            disabled={pageIndex >= pages}
          >
            <FiChevronsRight size={12} />
          </ButtonPagination>
        </ButtonsContainer>
      </Content>
      
    </Container>
  )
}
