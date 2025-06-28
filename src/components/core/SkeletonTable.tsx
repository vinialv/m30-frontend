import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableFooter, TableRow } from '@/components/ui/table'

type Props = {
  rows: number
  columns: number
  shouldShowFooter?: boolean
}

export function SkeletonTable({ rows, columns, shouldShowFooter }: Props) {
  const lines: number[] = Array.from({ length: rows }, (_, index) => index)
  shouldShowFooter = shouldShowFooter ?? false

  return (
    <>
      <TableBody>
        {lines.map((row) => (
          <TableRow key={row}>
            {Array.from({ length: columns }, (_, colIndex) => (
              <TableCell
                key={colIndex}
                className='h-8 px-1'
              >
                <Skeleton className='h-4 sm:h-8' />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      {shouldShowFooter && (
        <TableFooter>
          <TableRow>
            <TableCell
              className='pt-6 px-0'
              colSpan={columns}
            >
              <Skeleton className='w-3/10 mx-auto h-4 sm:h-8' />
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </>
  )
}
