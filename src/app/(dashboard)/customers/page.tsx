import { Suspense } from 'react'

import { SearchParamsProps } from '@/types/search-params'
import { CustomerProps } from '@/types/customers'

import { GenericTable } from '@/components/core/GenericTable'
import { SkeletonTable } from '@/components/core/SkeletonTable'
import { GenericCardHeader } from '@/components/core/GenericCardHeader'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { ProjectCategoryForm } from '@/components/project-categories/ProjectCategoryCreateUpdateForm'

import { getAll } from '@/services/customers'
import { CustomerTableRowSetup } from '@/components/customers/CustomerTableRowSetup'
import { CustomerForm } from '@/components/customers/CustomerCreateUpdateForm'

export default async function Customers({
  searchParams,
}: {
  searchParams: Promise<SearchParamsProps>
}) {
  const QUANTITY_COLUMNS_ON_TABLE = 6
  const QUANTITY_ROWS_ON_TABLE = 10

  return (
    <Card className='flex flex-col w-9/10 h-85/100 max-h-9/10'>
      <CardHeader className='w-full'>
        <GenericCardHeader
          title='Gerenciamento de Clientes'
          descriptionButtonCreation='Novo Cliente'
        >
          <CustomerForm mode='insert' />
        </GenericCardHeader>
      </CardHeader>
      <CardContent className='flex-1'>
        <Table className='w-full'>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              <TableHead className='min-w-40 w-22/100'>Nome</TableHead>
              <TableHead className='min-w-60 w-34/100'>E-mail</TableHead>
              <TableHead className='min-w-28 w-8/100'>Telefone</TableHead>
              <TableHead className='min-w-48 w-20/100'>Cidade</TableHead>
              <TableHead className='min-w-28 w-8/100 text-center'>Situação</TableHead>
              <TableHead className='min-w-28 w-8/100  text-center'>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <Suspense
            fallback={
              <SkeletonTable
                columns={QUANTITY_COLUMNS_ON_TABLE}
                rows={QUANTITY_ROWS_ON_TABLE}
                shouldShowFooter={true}
              />
            }
          >
            <GenericTable<CustomerProps>
              searchParams={searchParams}
              fetcher={getAll}
              columns={QUANTITY_COLUMNS_ON_TABLE}
              rowKey={(item) => item.id}
              emptyMessage='Nenhum cliente cadastrado.'
              renderRow={(item) => (
                <>
                  <TableCell className='truncate'>{item.name}</TableCell>
                  <TableCell className='truncate'>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell className='truncate'>
                    {item.city.name} - {item.city.state.uf}
                  </TableCell>
                  <TableCell className='text-center'>
                    <Badge
                      className={`text-xs font-medium text-black ${
                        item.status === 'A' ? 'bg-green-100' : 'bg-red-100'
                      }`}
                      variant='outline'
                    >
                      {item.status === 'A' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-center'>
                    <CustomerTableRowSetup item={item} />
                  </TableCell>
                </>
              )}
            />
          </Suspense>
        </Table>
      </CardContent>
    </Card>
  )
}
