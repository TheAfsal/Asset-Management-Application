import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Autocomplete, TextField, FormHelperText, Box } from "@mui/material";

interface AutoCompleteSelectProps {
  name: string;
  label?: string;
  options: { value: number; label: string }[];
  error?: boolean;
  helperText?: string;
}

const AutoCompleteSelect: React.FC<AutoCompleteSelectProps> = ({
  name,
  label,
  options,
  error,
  helperText,
}) => {
  const { control } = useFormContext();

  return (
    <Box>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value }, fieldState }) => (
          <>
            <Autocomplete
              options={options}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.label
              }
              //@ts-ignore
              isOptionEqualToValue={(option, val) => option.value === val}
              //@ts-ignore
              value={options.find((opt) => opt.value === value) || null}
              onChange={(_, selected) => {
                onChange(selected ? selected.value : null);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  size="medium"
                  sx={{ minWidth: "300px" }}
                  error={!!fieldState.error || error}
                  helperText={fieldState.error?.message || helperText || ""}
                />
              )}
              fullWidth
              disableClearable
            />
            {(helperText || fieldState.error) && (
              <FormHelperText error={!!fieldState.error || error}>
                {fieldState.error?.message || helperText}
              </FormHelperText>
            )}
          </>
        )}
      />
    </Box>
  );
};

export default AutoCompleteSelect;
