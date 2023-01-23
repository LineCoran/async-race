import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICar } from '../interfaces/interfaces';

type carAPI = { 
    name: string,
    color: string,
    id: number,
}

type UpdateCar = {
    data: {
        name: string,
        color: string,
    };
    id: number;
}


type UpdateWinner = {
    data: {
        wins: number,
        time: number,
    };
    id: number;
}

type ICarStatus = {
    id: number;
    status: string;
}

type ICarSuccessResponse = {
    velocity: number;
    distance: number;
  }

type ICheckDriver = {
    success: boolean;
}

type IGetCar = {
    _page: number;
    _limit: number;
}

type WinnerParams = {
  id: number,
  wins: number,
  time: number,
}

type winnerListParams = {
    _page: number;
    _limit: number;
    _sort: string;
    _order: string;
}



export const garageApi = createApi({
    reducerPath: 'Cars',
    tagTypes: ['Cars'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:3000'}),
    endpoints: (builder) => ({
        addCar: builder.mutation<ICar, Partial<ICar>>({
            query: (body) => ({
                url: '/garage',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{type: 'Cars', id: 'LIST'}],
        }),
        getCars: builder.query<carAPI[], IGetCar>({
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
        getAllCars: builder.query<carAPI[], string>({
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
            invalidatesTags: [{type: 'Cars', id: 'LIST'}],
        }),
        updateCar: builder.mutation<carAPI, UpdateCar>({
            query: ({data, id}) => ({
                url: `/garage/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: [{type: 'Cars', id: 'LIST'}],
        }),
        addWinner: builder.mutation<WinnerParams, Partial<WinnerParams>>({
            query: (body) => ({
                url: '/winners',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{type: 'Cars', id: 'LIST'}],
        }),
        getWinners: builder.query<WinnerParams[], winnerListParams>({
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
            query: ({data, id}) => ({
                url: `/winners/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: [{type: 'Cars', id: 'LIST'}],
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
                }
              }
            }
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
                }
            }
          }
        }),
    })
})

export const {
  useGetCarsQuery,
  useAddCarMutation,
  useDeleteCarMutation,
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
