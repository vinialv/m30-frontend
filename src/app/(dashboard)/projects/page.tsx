export default async function Projects() {
  const projectData = [
    { id: 1, name: 'Project A', description: 'This is a sample project.', status: 'Active' },
    {
      id: 2,
      name: 'Project B',
      description: 'This is another sample project.',
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Project C',
      description: 'This project is under development.',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Project D',
      description: 'This project has been completed.',
      status: 'Completed',
    },
    { id: 5, name: 'Project E', description: 'This project is on hold.', status: 'On Hold' },
  ]

  const TOTAL_ROWS = 10
  const emptyRows = TOTAL_ROWS - projectData.length

  return (
    <div className='w-full max-w-5xl border rounded-2xl overflow-hidden'>
      <table className='w-full table-fixed border-separate border-spacing-0'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='text-left p-2'>Project Name</th>
            <th className='text-left p-2'>Description</th>
            <th className='text-left p-2'>Status</th>
          </tr>
        </thead>
        <tbody>
          {projectData.map((project) => (
            <tr
              key={project.id}
              className='h-12 border-b'
            >
              <td className='p-2'>{project.name}</td>
              <td className='p-2'>{project.description}</td>
              <td className='p-2'>{project.status}</td>
            </tr>
          ))}

          {Array.from({ length: emptyRows }).map((_, idx) => (
            <tr
              key={`empty-${idx}`}
              className='h-12 border-b'
            >
              <td className='p-2'>&nbsp;</td>
              <td className='p-2'>&nbsp;</td>
              <td className='p-2'>&nbsp;</td>
            </tr>
          ))}
        </tbody>
        <tfoot className='bg-gray-100'>
          <tr>
            <td
              colSpan={3}
              className='text-center p-2'
            >
              Total Projects: {projectData.length}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
