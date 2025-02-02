import { createFileRoute } from '@tanstack/react-router'
import { ProtectedLayout } from '../../components/custom/ProtectedLayout'

export const Route = createFileRoute('/(protected)/_layout')({
  component: ProtectedLayout,
})
