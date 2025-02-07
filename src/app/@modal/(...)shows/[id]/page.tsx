import { getShow, getShows } from '~/actions/shows'
import { ShowDrawer } from '~/components/show-drawer/show-drawer'

export default async function ShowDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const show = await getShow(id)

  return <ShowDrawer show={show} />
}

export async function generateStaticParams() {
  const shows = await getShows()
  return shows.map((show) => ({ id: show.id }))
}
