'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useDebouncedCallback } from 'use-debounce'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

type Props = {
  placeholder: string | 'Pesquisar'
}

export function SearchInput({ placeholder }: Props) {
  const pathname = usePathname()
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  const handleChange = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams)
    const searchString = event.target.value

    if (params.has('page')) {
      params.delete('page')
    }
    if (searchString) {
      params.set('search', searchString)
    } else {
      params.delete('search')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 500)

  return (
    <div className='flex flex-1 relative '>
      <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
      <Input
        type='search'
        placeholder={placeholder}
        className='rounded-lg bg-card pl-8'
        defaultValue={searchParams.get('search') || ''}
        onChange={handleChange}
      />
    </div>
  )
}
