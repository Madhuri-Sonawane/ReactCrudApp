import { TextField, Button, Box, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { userFormConfig } from "../config/userFormConfig";
import { countries } from "../config/countryConfig";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "+91",
  phone: ""
};

function UserForm({ onSubmit, selectedUser }) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedUser) {
      // Split phone into country code + number if editing
      const matchedCountry = countries.find(c =>
        selectedUser.phone?.startsWith(c.code)
      );

      setFormData({
        ...selectedUser,
        countryCode: matchedCountry ? matchedCountry.code : "+91",
        phone: matchedCountry
          ? selectedUser.phone.replace(matchedCountry.code, "")
          : ""
      });
    }
  }, [selectedUser]);

  const validate = () => {
    const newErrors = {};

    userFormConfig.forEach((field) => {
      const value = formData[field.name];

      if (field.required && !value) {
        newErrors[field.name] = "This field is required";
      }

      if (field.name === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors.email = "Enter a valid email address";
        }
      }
    });

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const finalData = {
      ...formData,
      phone: `${formData.countryCode}${formData.phone}`
    };

    onSubmit(finalData);
    setFormData(initialState);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {/* Dynamic Fields */}
      {userFormConfig.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          type={field.type || "text"}
          value={formData[field.name]}
          onChange={(e) =>
            setFormData({ ...formData, [field.name]: e.target.value })
          }
          error={!!errors[field.name]}
          helperText={errors[field.name]}
          fullWidth
          margin="normal"
        />
      ))}

      {/* Country Dropdown */}
      <TextField
        select
        label="Country"
        value={formData.countryCode}
        onChange={(e) =>
          setFormData({ ...formData, countryCode: e.target.value })
        }
        fullWidth
        margin="normal"
      >
        {countries.map((country) => (
          <MenuItem key={country.code} value={country.code}>
            {country.name} ({country.code})
          </MenuItem>
        ))}
      </TextField>

      {/* Phone Number */}
      <TextField
        label="Phone Number"
        value={formData.phone}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "");
          if (value.length <= 10) {
            setFormData({ ...formData, phone: value });
          }
        }}
        error={!!errors.phone}
        helperText={errors.phone}
        fullWidth
        margin="normal"
        placeholder="10 digit number"
      />

      <Button
        variant="contained"
        type="submit"
        sx={{ mt: 2 }}
        fullWidth
      >
        {selectedUser ? "Update User" : "Add User"}
      </Button>
    </Box>
  );
}

export default UserForm;
