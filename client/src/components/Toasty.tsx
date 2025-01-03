const Toast = ({ message, type }: Toasty) => {
  const typeClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
  };

  const TYPE_ICONS = {
    success: (
      <>
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="sr-only">Check icon</span>
      </>
    ),
    error: (
      <>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
        </svg>
        <span className="sr-only">Error icon</span>
      </>
    ),
  } as const;

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center w-full max-w-xs p-4 mb-4 rounded-lg shadow ${typeClasses[type]}`}
      role="alert"
    >
      <div className="flex items-center justify-center w-8 h-8 mr-3">
        {TYPE_ICONS[type]}
      </div>
      <div className="text-sm font-medium">{message}</div>
    </div>
  );
};

export type Toasty = {
  message: string;
  type: "success" | "error";
};

export default Toast;
