const Checkbox = ({ label, id, name, handleChange, checked }) => {
  return (
    <div className="flex items-center mt-[1rem]">
      <input
        id={id}
        type="checkbox"
        name={name}
        onChange={handleChange}
        checked={checked}
        className="w-4 h-4 text-[#298FC2] rounded-full border-gray-300 focus:ring-[#298FC2] focus:ring-2"
      />
      <label
        htmlFor=""
        className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
