import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ItemDetail } from './ItemDetail';

import { Loading } from './Loading';

export const ProductDetail = () => {
	const [productPorId, setProductPorId] = useState();
	const id = useParams().id;

	useEffect(() => {
        fetch(`http://localhost:8080/api/products/${id}`,{
            method: "GET",
            headers:{
                        "Content-Type": "application/json",
                    }
        })
            .then(res => res.json())
            .then(data => setProductPorId({...data.payload}))
        
	}, [productPorId]);

	return <>{!productPorId ? <Loading /> : <ItemDetail item={productPorId} />}</>;
};