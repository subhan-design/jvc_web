import { ChevronDown, ChevronUp, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  value?: string[];
  onChange?: (selectedValues: string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  className?: string;
}

const SearchableSelectItem = ({
  options = [],
  value = [],
  onChange,
  placeholder = "Search...",
  multiple = true,
  className = "",
}: SearchableSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>(value);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedValues(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (optionValue: string) => {
    let newSelectedValues: string[];

    if (multiple) {
      if (selectedValues.includes(optionValue)) {
        newSelectedValues = selectedValues.filter((val) => val !== optionValue);
      } else {
        newSelectedValues = [...selectedValues, optionValue];
      }
    } else {
      newSelectedValues = [optionValue];
      setIsOpen(false);
    }

    setSelectedValues(newSelectedValues);
    onChange?.(newSelectedValues);
    setSearchTerm("");
  };

  const handleRemoveTag = (valueToRemove: string) => {
    const newSelectedValues = selectedValues.filter(
      (val) => val !== valueToRemove
    );
    setSelectedValues(newSelectedValues);
    onChange?.(newSelectedValues);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const getSelectedLabels = () => {
    return selectedValues.map((val) => {
      const option = options.find((opt) => opt.value === val);
      return option ? option.label : val;
    });
  };

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      {/* Main Container */}
      <div className="relative">
        {/* Dropdown Button */}
        <div
          className={`w-full border border-gray-300 rounded-md bg-white cursor-pointer`}
          onClick={toggleDropdown}
        >
          <div className="flex items-center justify-between p-2 gap-2">
            <div className="flex items-center gap-2 flex-1 flex-wrap">
              {/* Selected Tags inside input */}
              {selectedValues.length > 0 && (
                <>
                  {getSelectedLabels().map((label, index) => (
                    <div
                      key={selectedValues[index]}
                      className="inline-flex items-center gap-1 px-1 py-1 bg-blue-500 text-white text-xs rounded-md"
                    >
                      <span>{label}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveTag(selectedValues[index]);
                        }}
                        className="hover:bg-blue-600 rounded-full p-0.5"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </>
              )}
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsOpen(true)}
                placeholder={selectedValues.length === 0 ? placeholder : ""}
                className="flex-1 outline-none bg-transparent text-gray-700 min-w-0 border-none focus:ring-0 focus:border-none p-0"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            {isOpen ? (
              <ChevronUp size={16} className="text-gray-400 flex-shrink-0" />
            ) : (
              <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
            )}
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-50 text-gray-700 ${
                    selectedValues.includes(option.value)
                      ? "bg-blue-50 text-blue-600"
                      : ""
                  }`}
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500 text-center">
                No options found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const SearchableSelect = () => {
  const [selectedStates, setSelectedStates] = useState<string[]>(["alabama"]);

  const stateOptions: Option[] = [
    { value: "alabama", label: "Alabama" },
    { value: "alaska", label: "Alaska" },
    { value: "arizona", label: "Arizona" },
    { value: "arkansas", label: "Arkansas" },
    { value: "california", label: "California" },
    { value: "colorado", label: "Colorado" },
    { value: "connecticut", label: "Connecticut" },
    { value: "delaware", label: "Delaware" },
    { value: "florida", label: "Florida" },
    { value: "georgia", label: "Georgia" },
    { value: "hawaii", label: "Hawaii" },
    { value: "idaho", label: "Idaho" },
    { value: "illinois", label: "Illinois" },
    { value: "indiana", label: "Indiana" },
    { value: "iowa", label: "Iowa" },
    { value: "kansas", label: "Kansas" },
    { value: "kentucky", label: "Kentucky" },
    { value: "louisiana", label: "Louisiana" },
    { value: "maine", label: "Maine" },
    { value: "maryland", label: "Maryland" },
    { value: "massachusetts", label: "Massachusetts" },
    { value: "michigan", label: "Michigan" },
    { value: "minnesota", label: "Minnesota" },
    { value: "mississippi", label: "Mississippi" },
    { value: "missouri", label: "Missouri" },
    { value: "montana", label: "Montana" },
    { value: "nebraska", label: "Nebraska" },
    { value: "nevada", label: "Nevada" },
    { value: "new-hampshire", label: "New Hampshire" },
    { value: "new-jersey", label: "New Jersey" },
    { value: "new-mexico", label: "New Mexico" },
    { value: "new-york", label: "New York" },
    { value: "north-carolina", label: "North Carolina" },
    { value: "north-dakota", label: "North Dakota" },
    { value: "ohio", label: "Ohio" },
    { value: "oklahoma", label: "Oklahoma" },
    { value: "oregon", label: "Oregon" },
    { value: "pennsylvania", label: "Pennsylvania" },
    { value: "rhode-island", label: "Rhode Island" },
    { value: "south-carolina", label: "South Carolina" },
    { value: "south-dakota", label: "South Dakota" },
    { value: "tennessee", label: "Tennessee" },
    { value: "texas", label: "Texas" },
    { value: "utah", label: "Utah" },
    { value: "vermont", label: "Vermont" },
    { value: "virginia", label: "Virginia" },
    { value: "washington", label: "Washington" },
    { value: "west-virginia", label: "West Virginia" },
    { value: "wisconsin", label: "Wisconsin" },
    { value: "wyoming", label: "Wyoming" },
  ];

  return (
    <div className="">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select States
      </label>
      <SearchableSelectItem
        options={stateOptions}
        value={selectedStates}
        onChange={setSelectedStates}
        placeholder="Search states..."
        multiple={true}
      />
    </div>
  );
};

export default SearchableSelect;
