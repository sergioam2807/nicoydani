export type UploadInput = {
  buffer: Buffer;
  fileName: string;
  contentType: string;
};

export type UploadResult = {
  url: string;
};

export interface StorageAdapter {
  upload(input: UploadInput): Promise<UploadResult>;
}
