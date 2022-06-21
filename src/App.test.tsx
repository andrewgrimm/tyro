import React from 'react';
import 'intersection-observer';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosStatic,
} from 'axios';
import App from './App';
import { movieDetail, searchResult } from './testData/movies';

interface AxiosRequestParams {
  params?: {
    i?: string,
    page?: string,
    s?: string,
  }
}

interface AxiosMock extends AxiosStatic {
  create: (config?: AxiosRequestConfig) => AxiosInstance,
  request: (config?: AxiosRequestParams) => Promise<any>,
}

const mockAxios = axios as AxiosMock;
mockAxios.create = (config: any) => mockAxios as AxiosInstance;

/*
  N.B. due to the nature of infinite loading and the limited test data,
  the page number is added to imdbID and Title in response data to ensure uniqueness.
*/
const generateUniqueSearchResult = (suffix: string) => {
  const uniqueSearch = searchResult.Search.map((el: any) => ({
    ...el,
    imdbID: `${el.imdbID}${suffix}`,
    Title: `${el.Title}${suffix}`,
  }));

  return {
    ...searchResult,
    Search: uniqueSearch,
  };
};

describe('Getflix test suite', () => {
  it('should render', async () => {
    mockAxios.request = (config) => Promise.resolve({
      status: 200,
      data: generateUniqueSearchResult(config?.params?.page || ''),
    });

    const { getByText } = render(<App />);

    // initial load
    await waitFor(() => expect(getByText('Mission: Impossible - Ghost Protocol1')).toBeTruthy());
  });

  it('should allow the user to search using the search bar', async () => {
    mockAxios.request = (config) => Promise.resolve({
      status: 200,
      data: generateUniqueSearchResult(`${config?.params?.page}${config?.params?.s}`),
    });

    const { getByText } = render(<App />);
    fireEvent.input(screen.getByTestId('searchInput'), { target: { value: 'foo' } });
    fireEvent.click(screen.getByTestId('searchButton'));

    await waitFor(() => expect(getByText('Mission: Impossible - Ghost Protocol1foo')).toBeTruthy());
  });

  it('should show an error if search fails', async () => {
    mockAxios.request = (config) => Promise.reject(Error('failed request'));

    const { getByText } = render(<App />);
    await waitFor(() => expect(getByText('Oops! something has broken')).toBeTruthy());
  });

  it('should allow the user to select a movie', async () => {
    mockAxios.request = (config) => {
      // mock handles request for both movie details and movie search
      let data: any = movieDetail;
      if (config?.params?.s) {
        data = generateUniqueSearchResult(`${config?.params?.page}`);
      }
      return Promise.resolve({
        status: 200,
        data,
      });
    };
    const { getByText } = render(<App />);
    await waitFor(() => fireEvent.click(screen.getByText('Mission: Impossible - Ghost Protocol1')));

    await waitFor(() => expect(getByText(`Cast: ${movieDetail.Actors}`)).toBeTruthy());
  });
});
