import IStorageProvider from '../models/IStorageprovader';

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const fileindex = this.storage.findIndex(
      storagefile => storagefile === file,
    );

    this.storage.splice(fileindex, 1);
  }
}

export default FakeStorageProvider;
