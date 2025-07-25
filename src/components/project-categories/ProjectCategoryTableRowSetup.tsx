'use client'

import { TableRowClientWrapper } from '@/components/core/TableRowClientWrapper'
import { ProjectCategoryForm } from '@/components/project-categories/ProjectCategoryCreateUpdateForm'
import { ProjectCategoryProps } from '@/types/project-categories'

type Props = {
  item: ProjectCategoryProps
}

export function ProjectCategoryRowSetup({ item }: Props) {
  return (
    <TableRowClientWrapper<ProjectCategoryProps>
      item={item}
      id={item.id}
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
