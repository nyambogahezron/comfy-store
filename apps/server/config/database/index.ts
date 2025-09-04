import mongoose from 'mongoose';

export default async function ConnectDB(URL: string | undefined) {
  if (!URL) {
    throw new Error('Mongo URI is not provided');
  }

  try {
    await mongoose.connect(URL);
  } catch (error) {
    console.log(error);
  }
}
