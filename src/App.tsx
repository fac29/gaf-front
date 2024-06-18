import Landingpage from './components/Landingpage/Landingpage';
import ProductPage from './components/Productpage/ProductPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
	return (
		<>
		
			<Router>
				<Routes>
					<Route path="/product/:id" element={<ProductPage />} />
					<Route path="/" element={<Landingpage />} />
				</Routes>
			</Router>
		</>
	);
}
