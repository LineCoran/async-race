export type WinnerParams = {
  id: number;
  wins: number;
  time: number;
};

export type TableRows = {
  id: number;
  name: string;
  time: number;
  wins: number;
};

export type GarageListParams = {
  _page: number;
  _limit: number;
};

export type WinnerListParams = {
  _page: number;
  _limit: number;
  _sort: string;
  _order: string;
};

export type CarApi = {
  name: string;
  color: string;
  id: number;
};

export type UpdateCar = {
  data: {
    name: string;
    color: string;
  };
  id: number;
};

export type UpdateWinner = {
  data: {
    wins: number;
    time: number;
  };
  id: number;
};

export type ICarStatus = {
  id: number;
  status: string;
};

export type ICarSuccessResponse = {
  velocity: number;
  distance: number;
};

export type ICheckDriver = {
  success: boolean;
};
