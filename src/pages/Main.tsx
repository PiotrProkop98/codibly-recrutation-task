import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { CircularProgress, Container } from '@mui/material';

import NumberInput from '../components/NumberInput';
import DataTable from '../components/DataTable';

interface ProductsMeta {
  page: number,
  total: number,
  total_pages: number
};

const baseUrl = 'https://reqres.in/api/products';

const Main = () => {
  const navigate = useNavigate();

  const [products, productsSet] = React.useState<any>([]);
  const [productsMeta, productsMetaSet] = React.useState<ProductsMeta>();

  const [inputValue, inputValueSet] = React.useState<string>('');

  const [page, pageSet] = React.useState<string>('1');

  const [isLoading, isLoadingSet] = React.useState<boolean>(false);

  const cancelTokenSource = React.useRef<any>();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g,'');
    inputValueSet(newValue);
  };

  const handleRequest = () => {
    let url = '';

    if (inputValue !== null && inputValue !== '') {
      url = `?id=${inputValue}`;
    }

    if (page !== null || page !== '') {
      if (url !== '') {
        url += `&page=${page}`;
      } else {
        url += `?page=${page}`;
      }
    }

    if (url === '' && page === '') {
      url += '?per_page=5';
    } else {
      url += '&per_page=5';
    }

    navigate(url);

    url = `${baseUrl}/${url}`;

    isLoadingSet(true);
    cancelTokenSource.current = axios.CancelToken.source();

    axios.get(url, { cancelToken: cancelTokenSource.current.token })
      .then(result => {
        if (result.data.data instanceof Array) {
          productsSet(result.data.data);
        } else {
          productsSet([result.data.data]);
        }

        productsMetaSet({
          page: result.data.page,
          total: result.data.total,
          total_pages: result.data.total_pages
        });

        isLoadingSet(false);
      })
      .catch(() => {
        productsSet([]);
        isLoadingSet(false);
      });
  };

  React.useEffect(() => {
    handleRequest();
  }, []);

  React.useEffect(() => {
    handleRequest();
  }, [inputValue]);

  return (
    <div className="Main">
      <Container maxWidth="sm" sx={{ marginTop: '50px', textAlign: 'center' }}>
        <NumberInput handleChange={handleInputChange} value={inputValue} />
        
        {isLoading && <CircularProgress sx={{ margin: '0 auto' }} />}
        {!isLoading && (
          <>
            <DataTable products={products} />
          </>)}
      </Container>
    </div>
  );
};

export default Main;