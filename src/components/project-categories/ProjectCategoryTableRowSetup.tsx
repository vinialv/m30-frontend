'use client'

import { TableRowClientWrapper } from '@/components/core/TableRowClientWrapper'
import { ProjectCategoryForm } from '@/components/project-categories/ProjectCategoryCreateUpdateForm'
import { ProjectCategoryProps } from '@/types/project-categories'
import { deleteCategoryAction } from '@/app/(dashboard)/project-categories/actions/delete'
import { TableRowSetupProps } from '@/types/shared'

export function ProjectCategoryRowSetup({ item }: TableRowSetupProps<ProjectCategoryProps>) {
  return (
    <TableRowClientWrapper<ProjectCategoryProps>
      item={item}
      id={item.id}
      path={'/project-categories'}
      deleteAction={deleteCategoryAction}
      editFormComponent={(close) => (
        <ProjectCategoryForm
          key={item.id}
          mode='update'
          id={item.id}
          data={item}
          closeModal={close}
        />
      )}
    />
  )
}
