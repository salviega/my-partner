import { JSX } from 'react'

import Layout from '../../shared/Layout'

import Categories from './componets/Categories'
import Explore from './componets/Explore'

export default function Home(): JSX.Element {
	return (
		<Layout>
			<Explore />
			<Categories />
		</Layout>
	)
}
