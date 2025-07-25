import { Suspense } from 'react'

import { SearchParamsProps } from '@/types/search-params'
import { ProjectCategoryProps } from '@/types/project-categories'

import { GenericTable } from '@/components/core/GenericTable'
import { SkeletonTable } from '@/components/core/SkeletonTable'
import { GenericCardHeader } from '@/components/core/GenericCardHeader'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { ProjectCategoryForm } from '@/components/project-categories/ProjectCategoryCreateUpdateForm'

import { getAll } from '@/services/project-categories'
import { ProjectCategoryRowSetup } from '@/components/project-categories/ProjectCategoryTableRowSetup'

export default async function ProjectCategories({
  searchParams,
}: {
  searchParams: Promise<SearchParamsProps>
}) {
  const QUANTITY_COLUMNS_ON_TABLE = 3
  const QUANTITY_ROWS_ON_TABLE = 10

  return (
    <Card className='flex flex-col w-9/10 h-85/100 max-h-9/10'>
      <CardHeader className='w-full'>
        <GenericCardHeader
          title='Gerenciamento de Categorias de Projetos'
          descriptionButtonCreation='Nova Categoria'
        >
          <ProjectCategoryForm mode='insert' />
        </GenericCardHeader>
      </CardHeader>
      <CardContent className='h-full '>
        <Table className='overflow-y-auto'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-80/100'>Descrição</TableHead>
              <TableHead className='min-w-28 w-10/100 text-center'>Situação</TableHead>
              <TableHead className='min-w-28 w-10/100 text-center'>Ações</TableHead>
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
            <GenericTable<ProjectCategoryProps>
              searchParams={searchParams}
              fetcher={getAll}
              columns={QUANTITY_COLUMNS_ON_TABLE}
              rowKey={(item) => item.id}
              emptyMessage='Nenhuma categoria cadastrada.'
              renderRow={(item) => (
                <>
                  <TableCell className='truncate'>{item.description}</TableCell>
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
                    <ProjectCategoryRowSetup item={item} />
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
