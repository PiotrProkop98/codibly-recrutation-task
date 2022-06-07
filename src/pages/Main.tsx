import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  const [searchParams, searchParamsSet] = useSearchParams();

  const [products, productsSet] = React.useState<any>([]);
  const [productsMeta, productsMetaSet] = React.useState<ProductsMeta>();

  const [inputValue, inputValueSet] = React.useState<string>('');

  const [isLoading, isLoadingSet] = React.useState<boolean>(false);

  const cancelTokenSource = React.useRef<any>();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g,'');
    inputValueSet(newValue);
  };

  const handleRequest = () => {
    if (!searchParams.get('id')) {
      if (inputValue !== null && inputValue !== '') {
        searchParams.append('id', inputValue);
      }
    } else if (inputValue === null || inputValue === '') {
      searchParams.delete('id');
    } else {
      searchParams.set('id', inputValue);
    }

    if (!searchParams.get('page')) {
      searchParams.append('page', '1');
    }

    if (!searchParams.get('per_page')) {
      searchParams.append('per_page', '5');
    }

    searchParamsSet(searchParams);

    let url = '';

    if (searchParams.get('id')) {
      url = `?id=${searchParams.get('id')}&page=${searchParams.get('page')}&per_page=${searchParams.get('per_page')}`;
    } else {
      url = `?page=${searchParams.get('page')}&per_page=${searchParams.get('per_page')}`;
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