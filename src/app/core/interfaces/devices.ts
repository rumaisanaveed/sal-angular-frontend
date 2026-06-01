import { Pagination } from '.';

export interface Device {
  _id: string;
  deviceName: string;
  deviceType: string;
  brand: string;
  model: string;
  description: string;
  status: string;
}

export interface DevicesListResponse {
  success: boolean;
  message: string;
  data: Device[];
  pagination: Pagination;
}

export type AddDevicePayload = Omit<Device, '_id'>;
