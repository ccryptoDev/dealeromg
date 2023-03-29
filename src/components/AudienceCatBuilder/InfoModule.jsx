function InfoModule() {
  return (
    <div
      className="flex flex-col justify-center items-center p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
      role="alert"
    >
      <svg
        className="inline flex-shrink-0 mr-3 mb-3 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"></path>
      </svg>
      <div>
        <span className="font-medium">Important Message: </span>
        Education is defined as the level of education completed by the
        consumer. This is a probabilistic attribute based on self-reported
        information, surveys, and census sources.
      </div>
    </div>
  );
}

export default InfoModule;
