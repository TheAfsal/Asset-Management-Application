import { useState, useMemo } from "react";
import { useFormContext } from "react-hook-form";

interface AutoCompleteSelectProps {
  name: string;
  options: { value: number; label: string }[];
}

const AutoCompleteSelect: React.FC<AutoCompleteSelectProps> = ({
  name,
  options,
}) => {
  const { register } = useFormContext();
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    const query = search.toLowerCase();
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(query)
    );
  }, [search, options]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-1"
        placeholder="Search..."
        aria-label={`Search ${name}`}
      />
      <select
        {...register(name, { valueAsNumber: true })}
        className="w-full p-2 border rounded"
      >
        <option value="">Select...</option>
        {filteredOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AutoCompleteSelect;
