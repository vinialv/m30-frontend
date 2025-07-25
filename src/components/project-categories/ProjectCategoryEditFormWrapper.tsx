'use client'

import { ProjectCategoryProps } from '@/types/project-categories'
import { ProjectCategoryForm } from '@/components/project-categories/ProjectCategoryCreateUpdateForm'

type Props = {
  item: ProjectCategoryProps
  closeModal: () => void
}

export function ProjectCategoryEditFormWrapper({ item, closeModal }: Props) {
  return (
    <ProjectCategoryForm
      key={item.id}
      mode='update'
      id={item.id}
      data={item}
      closeModal={closeModal}
    />
  )
}
