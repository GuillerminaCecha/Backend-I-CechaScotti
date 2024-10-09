// VER VER VER import { ItemList } from './ItemList';
import { useEffect, useState } from 'react';
import { Loading } from './Loading';

export const ItemListContainer = () => {
	const [products, setProducts] = useState([]);
	// const category = useParams().categoria;

	useEffect(() => {
		fetch("http://localhost:8080/api/products", {
            method: "GET",
            headers:{
                        "Content-Type": "application/json",
                    }
        })
        .then(response => response.json())
        .then(data => setProducts(data.payload.docs?.map(doc => ({
            id: doc.id || null,
            title: doc.title.toUpperCase().trim(),
            description: doc.description.trim(),
            category: doc.category.toUpperCase().trim(),
            code: doc.code,
            price: doc.price,
            status: doc.status,
            stock: doc.stock,
            thumbnail: doc.thumbnail?.toLowerCase().trim(),
        }))))
	}, []);

	return (
		<div className="container-cards">
			{products.length === 0 ? <Loading /> : <ItemList products={products} />}
		</div>
	);
};