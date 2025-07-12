type CustomErrorProps = {
  message: string;
  statusCode: number;
};

class CustomError extends Error {
  statusCode: number;

  constructor({ message, statusCode }: CustomErrorProps) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default CustomError;
