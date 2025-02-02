import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/_layout/')({
  component: Index,
})

function Index() {
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Backoffice homepage</h1>
        <p>with Tanstack Stack</p>
      </div>
    </div>
  )
}
