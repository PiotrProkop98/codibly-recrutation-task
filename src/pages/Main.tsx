import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { CircularProgress, Container } from '@mui/material';

import NumberInput from '../components/NumberInput';
import DataTable from '../components/DataTable';
import PaginationButtonGroup from '../components/PaginationButtonGroup';

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

  const [page, pageSet] = React.useState<number>(1);

  const [paginationButtonNextDisable, paginationButtonNextDisableSet] = React.useState<boolean>(false);
  const [paginationButtonPreviousDisable, paginationButtonPreviousDisableSet] = React.useState<boolean>(false);

  const [inputValue, inputValueSet] = React.useState<string>('');

  const [isLoading, isLoadingSet] = React.useState<boolean>(false);

  const cancelTokenSource = React.useRef<any>();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g,'');
    inputValueSet(newValue);
  };

  const handleNextButtonClick = () => {
    if (productsMeta?.total_pages === page) {
      paginationButtonNextDisableSet(true);
      return;
    } else {
      paginationButtonNextDisableSet(false);
    }

    pageSet(page + 1);
  };

  const handlePreviousButtonClick = () => {
    if (page === 1) {
      paginationButtonPreviousDisableSet(true);
      return;
    } else {
      paginationButtonPreviousDisableSet(false);
    }

    pageSet(page - 1);
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
    } else {
      console.log(page);
      searchParams.set('page', String(page));
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
    if (productsMeta?.total_pages === page) {
      paginationButtonNextDisableSet(true);
    } else {
      paginationButtonNextDisableSet(false);
    }

    if (page === 1) {
      paginationButtonPreviousDisableSet(true);
    } else {
      paginationButtonPreviousDisableSet(false);
    }
  }, [page]);

  React.useEffect(() => {
    handleRequest();
  }, [inputValue, page]);

  return (
    <div className="Main">
      <Container maxWidth="sm" sx={{ marginTop: '50px', textAlign: 'center' }}>
        <NumberInput handleChange={handleInputChange} value={inputValue} />
        
        {isLoading && <CircularProgress sx={{ margin: '0 auto' }} />}
        {!isLoading && (
          <>
            <DataTable products={products} />
          </>
        )}

        <PaginationButtonGroup
          handleOnNextClick={handleNextButtonClick}
          handleOnPreviousClick={handlePreviousButtonClick}
          nextButtonDisabled={paginationButtonNextDisable}
          previousButtonDisabled={paginationButtonPreviousDisable}
        />
      </Container>
    </div>
  );
};

export default Main;