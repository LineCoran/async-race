import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICar } from '../interfaces/interfaces';
import {
  CarApi,
  GarageListParams,
  ICarStatus,
  ICarSuccessResponse,
  ICheckDriver,
  UpdateCar,
  UpdateWinner,
  WinnerListParams,
  WinnerParams,
} from '../interfaces/types';

export const garageApi = createApi({
  reducerPath: 'Cars',
  tagTypes: ['Cars'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3000' }),
  endpoints: (builder) => ({
    addCar: builder.mutation<ICar, Partial<ICar>>({
      query: (body) => ({
        url: '/garage',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Cars', id: 'LIST' }],
    }),
    getCars: builder.query<CarApi[], GarageListParams>({
      query: (params) => ({
        url: `/garage`,
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Cars' as const, id })),
              { type: 'Cars', id: 'LIST' },
            ]
          : [{ type: 'Cars', id: 'LIST' }],
    }),
    getAllCars: builder.query<CarApi[], string>({
      query: () => ({
        url: `/garage`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Cars' as const, id })),
              { type: 'Cars', id: 'LIST' },
            ]
          : [{ type: 'Cars', id: 'LIST' }],
    }),
    deleteCar: builder.mutation({
      query: (id: number) => ({
        url: `/garage/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Cars', id: 'LIST' }],
    }),
    deleteWinner: builder.mutation({
      query: (id: number) => ({
        url: `/winners/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Cars', id: 'LIST' }],
    }),
    updateCar: builder.mutation<CarApi, UpdateCar>({
      query: ({ data, id }) => ({
        url: `/garage/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'Cars', id: 'LIST' }],
    }),
    addWinner: builder.mutation<WinnerParams, Partial<WinnerParams>>({
      query: (body) => ({
        url: '/winners',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Cars', id: 'LIST' }],
    }),
    getWinners: builder.query<WinnerParams[], WinnerListParams>({
      query: (params) => ({
        url: `/winners`,
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Cars' as const, id })),
              { type: 'Cars', id: 'LIST' },
            ]
          : [{ type: 'Cars', id: 'LIST' }],
    }),
    getAllWinners: builder.query<WinnerParams[], string>({
      query: () => ({
        url: `/winners`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Cars' as const, id })),
              { type: 'Cars', id: 'LIST' },
            ]
          : [{ type: 'Cars', id: 'LIST' }],
    }),
    getWinner: builder.query<WinnerParams, number>({
      query: (id) => ({
        url: `/winners/${id}`,
      }),
    }),
    updateWinner: builder.mutation<WinnerParams, UpdateWinner>({
      query: ({ data, id }) => ({
        url: `/winners/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'Cars', id: 'LIST' }],
    }),
    startCar: builder.mutation<ICarSuccessResponse, ICarStatus>({
      query(data) {
        const { id, status } = data;
        return {
          url: `/engine`,
          method: 'PATCH',
          params: {
            id,
            status,
          },
        };
      },
    }),
    checkEngine: builder.mutation<ICheckDriver, ICarStatus>({
      query(data) {
        const { id, status } = data;
        return {
          url: `/engine`,
          method: 'PATCH',
          params: {
            id,
            status,
          },
        };
      },
    }),
  }),
});

export const {
  useGetCarsQuery,
  useAddCarMutation,
  useDeleteCarMutation,
  useDeleteWinnerMutation,
  useStartCarMutation,
  useCheckEngineMutation,
  useUpdateCarMutation,
  useAddWinnerMutation,
  useGetWinnersQuery,
  useGetWinnerQuery,
  useUpdateWinnerMutation,
  useGetAllCarsQuery,
  useGetAllWinnersQuery,
} = garageApi;
