type Toasty = {
  message: string;
  type: 'success' | 'error' | 'info';
};

const Toast = ({ message, type }: Toasty) => {
  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div
      className={`absolute bottom-5 w-1 right-5  flex items-center p-4 text-black rounded shadow-lg ${typeClasses[type]}`}
    >
      <div className="flex-1">
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
